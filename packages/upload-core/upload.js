import tus from 'tus-js-client';

const hashCode = str => {
  let hash = 0;
  if (str.length === 0) return hash;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char; // eslint-disable-line
    hash = hash & hash; // eslint-disable-line
  }
  return hash;
};

const defaultOptions = {
  endpoint: '/ms/api/availity/internal/core/vault/upload/v1/resumable',
  chunkSize: 3e6, // 3MB
  removeFingerprintOnSuccess: true,
  fingerprint(file, options = {}) {
    const attributes = [file.name, file.type, file.size, file.lastModified];

    const key = ['tus', ...attributes].join('-');

    const signature = [
      ...attributes,
      options.endpoint,
      ...Object.keys(options.metadata || {}).map(key => options.metadata[key]),
    ].join('');

    const print = Math.abs(hashCode(signature));

    return `${key}${print}`;
  },
};

class Upload {
  constructor(file, options) {
    if (!file) {
      throw Error('[options.file] must be defined and of type File(s)');
    }

    if (!options || !options.bucketId) {
      throw Error('[options.bucketId] must be defined');
    }

    if (!options.customerId) {
      throw Error('[options.customerId] must be defined');
    }

    if (!options.clientId) {
      throw Error('[options.clientId] must be defined');
    }

    this.file = file;
    this.options = Object.assign(options, defaultOptions);
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
    this.waitForPw = true;
  }

  inStatusCategory(status, category) {
    return status >= category && status < category + 100;
  }

  scan(data) {
    clearTimeout(this.timeoutID);

    if (!this.isValidFile()) {
      return;
    }

    const xhr = new window.XMLHttpRequest();

    xhr.open('HEAD', this.upload.url, true);
    xhr.setRequestHeader('Tus-Resumable', '1.0.0');
    xhr.setRequestHeader('X-Client-ID', this.options.clientId);
    xhr.setRequestHeader('X-Availity-Customer-ID', this.options.customerId);
    xhr.setRequestHeader('X-XSRF-TOKEN', this.getToken());
    if (data) {
      xhr.setRequestHeader(data.header, data.value);
    }

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
        if (this.waitForPw) {
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

      this.onProgress.forEach(cb => cb());
      this.timeoutId = setTimeout(() => {
        this.scan();
      }, 50);
    };

    xhr.onerror = err => {
      this.setError('rejected', 'Network Error', err);
      this.error = err;
    };

    xhr.send(null);
  }

  getPercentage() {
    const processedBytes = this.bytesSent + this.bytesScanned;
    const combinedTotalBytes = this.bytesTotal * 2;
    return processedBytes / combinedTotalBytes * 100;
  }

  getToken() {
    return document.cookie.replace(
      /(?:(?:^|.*;\s*)XSRF-TOKEN\s*=\s*([^;]*).*$)|^.*$/,
      '$1'
    );
  }

  start() {
    const { file } = this;

    const metadata = {
      'availity-filename': file.name,
      'availity-content-type': file.type,
      'availity-attachment-name': 'N/A',
    };
    Object.assign(metadata, this.options.metadata);

    const upload = new tus.Upload(file, {
      resume: true,
      endpoint: `${this.options.endpoint}/${this.options.bucketId}/`,
      chunkSize: this.options.chunkSize,
      removeFingerprintOnSuccess: this.options.removeFingerprintOnSuccess,
      fingerprint: this.options.fingerprint,
      metadata,
      headers: {
        'X-XSRF-TOKEN': this.getToken(),
        'X-Availity-Customer-ID': this.options.customerId,
        'X-Client-ID': this.options.clientId,
      },
      onError: err => {
        if (!this.isValidFile()) {
          return;
        }
        this.setError('rejected', 'Network Error', err);
        this.error = err;
      },
      onProgress: (bytesSent, bytesTotal) => {
        if (!this.isValidFile()) {
          this.abort();
          return;
        }
        this.bytesSent = bytesSent;
        this.bytesTotal = bytesTotal;
        this.percentage = this.getPercentage();
        this.onProgress.forEach(cb => cb());
      },
      onSuccess: () => {
        if (!this.isValidFile()) {
          return;
        }
        const xhr = this.upload._xhr; // eslint-disable-line
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
    this.waitForPw = false;
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
    return true;
  }

  getResult(xhr) {
    if (this.hasError()) {
      return { status: 'rejected' };
    }
    const scanResult = xhr.getResponseHeader('AV-Scan-Result');
    const uploadResult = xhr.getResponseHeader('Upload-Result');
    const decryptResult = xhr.getResponseHeader('Decryption-Result');
    const msg = xhr.getResponseHeader('Upload-Message');
    if (scanResult === 'rejected') {
      return { status: scanResult, message: msg || 'Failed AV scan' };
    }

    if (uploadResult === 'rejected') {
      this.waitForPw = true;
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
      if (!this.waitForPw && decryptResult === null) {
        return { status: 'pending', message: msg || '' };
      }
      if (decryptResult === 'rejected') {
        this.waitForPw = true;
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
    if (!this.hasError()) {
      this.status = status;
      this.errorMessage = message || 'An error occurred';
      this.onError.forEach(cb => cb(err || new Error(message)));
    }
  }

  hasError() {
    if (this.errorMessage && this.status !== 'encrypted') {
      return true;
    }
    return false;
  }

  abort() {
    if (this.upload) {
      this.upload.abort();
    }
  }
}

export default Upload;
