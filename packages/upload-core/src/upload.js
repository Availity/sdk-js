import tus from 'tus-js-client';
import resolveUrl from '@availity/resolve-url';

const hashCode = str => {
  let hash = 0;
  if (str.length === 0) return hash;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char; // eslint-disable-line no-bitwise
    // eslint-disable-next-line operator-assignment
    hash = hash & hash; // eslint-disable-line no-bitwise
  }
  return hash;
};

const defaultOptions = {
  endpoint: '/ms/api/availity/internal/core/vault/upload/v1/resumable',
  chunkSize: 3e6, // 3MB
  removeFingerprintOnSuccess: true,
  retryDelays: [0, 1000, 3000, 5000],
  stripFileNamePathSegments: true,
  fingerprint(file, options = {}) {
    const attributes = [file.name, file.type, file.size, file.lastModified];
    let attributesKey = 'tus-';
    for (let i = 0; i < attributes.length; i++) {
      if (attributes[i]) {
        attributesKey += `${attributes[i]}-`;
      }
    }

    const keys = Object.keys(options.metadata || {}).map(
      key => options.metadata[key]
    );
    const signature = [
      attributes.toString().replace(/,/g, ''),
      options.endpoint,
      keys,
    ].join('');

    const print = Math.abs(hashCode(signature));

    return `${attributesKey}${print}`;
  },
};

class Upload {
  constructor(file, options) {
    if (!file) {
      throw new Error('[options.file] must be defined and of type File(s)');
    }

    if (!options || !options.bucketId) {
      throw new Error('[options.bucketId] must be defined');
    }

    if (!options.customerId) {
      throw new Error('[options.customerId] must be defined');
    }

    if (!options.clientId) {
      throw new Error('[options.clientId] must be defined');
    }

    this.file = file;
    this.options = Object.assign({}, defaultOptions, options);

    this.options.endpoint = resolveUrl({ relative: this.options.endpoint });

    this.percentage = 0;
    this.onError = [];
    this.onSuccess = [];
    this.onProgress = [];
    this.bytesTotal = 0;
    this.bytesSent = 0;
    this.bytesScanned = 0;
    this.errorMessage = null;
    this.status = 'pending';
    this.timeoutID = undefined;
    this.error = null;
    this.waitForPassword = true;
  }

  inStatusCategory(status, category) {
    return status >= category && status < category + 100;
  }

  scan(data) {
    clearTimeout(this.timeoutID);

    const xhr = new window.XMLHttpRequest();

    xhr.open('HEAD', this.upload.url, true);
    xhr.setRequestHeader('Tus-Resumable', '1.0.0');
    xhr.setRequestHeader('X-Client-ID', this.options.clientId);
    xhr.setRequestHeader('X-Availity-Customer-ID', this.options.customerId);
    xhr.setRequestHeader('X-XSRF-TOKEN', this.getToken());
    if (data) {
      xhr.setRequestHeader(data.header, data.value);
    }

    // eslint-disable-next-line unicorn/prefer-add-event-listener
    xhr.onload = () => {
      if (!this.inStatusCategory(xhr.status, 200)) {
        this.setError(
          'rejected',
          `Invalid status returned: ${xhr.status}`,
          xhr
        );
        return;
      }

      this.bytesScanned = parseInt(xhr.getResponseHeader('AV-Scan-Bytes'), 10);
      this.percentage = this.getPercentage();

      const result = this.getResult(xhr);

      if (result.status === 'rejected') {
        this.setError(result.status, result.message);

        return;
      }

      if (result.status === 'encrypted') {
        if (this.waitForPassword) {
          this.setError(result.status, result.message);
          clearTimeout(this.timeoutId);
          return;
        }
      }

      if (result.status === 'accepted') {
        this.percentage = 100;
        this.status = result.status;
        this.errorMessage = null;
        const references = xhr.getResponseHeader('references');
        if (references) {
          this.references = JSON.parse(references);
        }
        this.onSuccess.forEach(cb => cb());
        return;
      }

      if (result.status === 'decrypting') {
        this.setError(result.status, result.message);
      }

      this.onProgress.forEach(cb => cb());
      this.timeoutId = setTimeout(() => {
        this.scan();
      }, 50);
    };

    // eslint-disable-next-line unicorn/prefer-add-event-listener
    xhr.onerror = err => {
      this.setError('rejected', 'Network Error', err);
      this.error = err;
    };

    xhr.send(null);
  }

  getPercentage() {
    const processedBytes = this.bytesSent + this.bytesScanned;
    const combinedTotalBytes = this.bytesTotal * 2;
    return (processedBytes / combinedTotalBytes) * 100;
  }

  getToken() {
    return document.cookie.replace(
      /(?:(?:^|.*;\s*)XSRF-TOKEN\s*=\s*([^;]*).*$)|^.*$/,
      '$1'
    );
  }

  start() {
    const { file } = this;

    if (!this.isValidFile()) {
      return;
    }

    const fileName = this.trimFileName(file.name);

    const metadata = {
      'availity-filename': fileName,
      'availity-content-type': file.type,
      'availity-attachment-name': 'N/A',
    };
    Object.assign(metadata, this.options.metadata);

    const upload = new tus.Upload(file, {
      resume: true,
      endpoint: `${this.options.endpoint}/${this.options.bucketId}/`,
      chunkSize: this.options.chunkSize,
      retryDelays: this.options.retryDelays,
      removeFingerprintOnSuccess: this.options.removeFingerprintOnSuccess,
      fingerprint: this.options.fingerprint,
      metadata,
      headers: {
        'X-XSRF-TOKEN': this.getToken(),
        'X-Availity-Customer-ID': this.options.customerId,
        'X-Client-ID': this.options.clientId,
      },
      onError: err => {
        this.setError('rejected', 'Network Error', err);
        this.error = err;
      },
      onProgress: (bytesSent, bytesTotal) => {
        this.bytesSent = bytesSent;
        this.bytesTotal = bytesTotal;
        this.percentage = this.getPercentage();
        this.onProgress.forEach(cb => cb());
      },
      onSuccess: () => {
        const xhr = this.upload._xhr;
        this.bytesScanned =
          parseInt(xhr.getResponseHeader('AV-Scan-Bytes'), 10) || 0;
        this.percentage = this.getPercentage();

        const result = this.getResult(xhr);

        if (result.status === 'accepted') {
          this.percentage = 100;
          this.status = result.status;
          this.errorMessage = null;
          const references = xhr.getResponseHeader('references');
          if (references) {
            this.references = JSON.parse(references);
          }
          this.onSuccess.forEach(cb => cb());
          return;
        }

        if (result.status === 'rejected') {
          this.setError(result.status, result.message);
          return;
        }

        this.scan();
      },
    });
    this.upload = upload;
    this.id = this.upload.options
      .fingerprint(this.file, this.options)
      .replace(/[^a-zA-Z0-9-]/g, '');

    upload.start();
  }

  sendPassword(pw) {
    this.waitForPassword = false;
    this.scan({ header: 'Encryption-Password', value: pw });
  }

  isValidFile() {
    if (this.options.fileTypes) {
      if (!this.file.name) {
        return false;
      }
      const fileName = this.file.name;
      const fileExt = fileName
        .substring(fileName.lastIndexOf('.'))
        .toLowerCase();
      for (let i = 0; i < this.options.fileTypes.length; i++) {
        this.options.fileTypes[i] = this.options.fileTypes[i].toLowerCase();
      }
      if (this.options.fileTypes.indexOf(fileExt) < 0) {
        this.setError('rejected', `Document type ${fileExt} is not allowed`);
        return false;
      }
    }
    if (this.options.maxSize) {
      if (this.file.size > this.options.maxSize) {
        this.setError('rejected', 'Document is too large');
        return false;
      }
    }
    if (this.options.allowedFileNameCharacters) {
      const fileName = this.file.name.substring(
        0,
        this.file.name.lastIndexOf('.')
      );
      const regExp = new RegExp(
        `([^${this.options.allowedFileNameCharacters}])`,
        'g'
      );
      if (fileName && fileName.match(regExp) !== null) {
        this.setError('rejected', 'File name contains characters not allowed');
        return false;
      }
    }
    return true;
  }

  trimFileName(fileName) {
    if (this.options.stripFileNamePathSegments) {
      fileName = fileName.substring(fileName.lastIndexOf('\\') + 1);
      fileName = fileName.substring(fileName.lastIndexOf('/') + 1);
    }
    return fileName;
  }

  getResult(xhr) {
    const scanResult = xhr.getResponseHeader('AV-Scan-Result');
    const uploadResult = xhr.getResponseHeader('Upload-Result');
    const decryptResult = xhr.getResponseHeader('Decryption-Result');
    const msg = xhr.getResponseHeader('Upload-Message');
    if (scanResult === 'rejected') {
      return { status: scanResult, message: msg || 'Failed AV scan' };
    }

    if (uploadResult === 'rejected') {
      this.waitForPassword = true;
      if (decryptResult === 'rejected') {
        return {
          status: uploadResult,
          message: msg || 'Maximum password attempts reached',
        };
      }
      return { status: uploadResult, message: msg || 'File upload rejected' };
    }

    if (uploadResult === 'encrypted') {
      // needs pw, isDecrypting, isScanning
      if (
        !this.waitForPassword &&
        (decryptResult === null || decryptResult === 'pending')
      ) {
        return { status: 'decrypting', message: msg || 'Decrypting file' };
      }
      if (decryptResult === 'rejected') {
        this.waitForPassword = true;
        return { status: uploadResult, message: msg || 'Incorrect password' };
      }
      return {
        status: uploadResult,
        message: msg || 'Encrypted files require a password',
      };
    }

    if (scanResult === 'accepted' && uploadResult === 'accepted') {
      return { status: 'accepted', message: msg || '' };
    }

    return { status: 'pending', message: msg || '' };
  }

  setError(status, message, err) {
    this.status = status;
    this.parseErrorMessage(message, err);
    this.onError.forEach(cb => cb(err || new Error(this.errorMessage)));
  }

  parseErrorMessage(message, err) {
    if (err) {
      let msg = err.originalRequest.getResponseHeader('Upload-Message');
      if (!msg) {
        const temp = err.message.match(/response\Wtext:\W(.*)\)/);
        if (temp && temp.length === 2) {
          [, msg] = temp;
        }
      }
      if (!msg) {
        msg = message;
      }
      this.errorMessage = msg;
    } else {
      this.errorMessage = message;
    }
  }

  abort() {
    if (this.upload) {
      this.upload.abort();
    }
  }
}

export default Upload;
