import tus from 'tus-js-client';
import resolveUrl from '@availity/resolve-url';
import * as Tiff from 'tiff';

// https://stackoverflow.com/questions/6122571/simple-non-secure-hash-function-for-javascript/8831937#8831937
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
  pollingTime: 5000,
  retryDelays: [0, 1000, 3000, 5000],
  stripFileNamePathSegments: true,
  fingerprint(file, options = {}, callback) {
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

    if (callback) {
      return callback(null, `${attributesKey}${print}`);
    }

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
    this.options = { ...defaultOptions, ...options };

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

    const fileName = this.trimFileName(file.name);

    const metadata = {
      'availity-filename': fileName,
      'availity-content-type': file.type,
      'availity-attachment-name': 'N/A',
    };
    Object.assign(metadata, this.options.metadata);

    const upload = new tus.Upload(this.file, {
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
        for (const cb of this.onProgress)  cb();
      },
      onSuccess: () => {
        const xhr = this.upload._xhr;
        this.bytesScanned =
          Number.parseInt(xhr.getResponseHeader('AV-Scan-Bytes'), 10) || 0;
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
          for (const cb of this.onSuccess)  cb();
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
    this.id = this.generateId();
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

      this.bytesScanned = Number.parseInt(xhr.getResponseHeader('AV-Scan-Bytes'), 10);
      this.percentage = this.getPercentage();

      const result = this.getResult(xhr);

      if (result.status === 'rejected') {
        this.setError(result.status, result.message);

        return;
      }

      if (result.status === 'encrypted' && this.waitForPassword) {
          this.setError(result.status, result.message);
          clearTimeout(this.timeoutId);
          return;
        }

      if (result.status === 'accepted') {
        this.percentage = 100;
        this.status = result.status;
        this.errorMessage = null;
        const references = xhr.getResponseHeader('references');
        if (references) {
          this.references = JSON.parse(references);
        }
        for (const cb of this.onSuccess)  cb();
        return;
      }

      if (result.status === 'decrypting') {
        this.setError(result.status, result.message);
      }

      for (const cb of this.onProgress)  cb();
      this.timeoutId = setTimeout(() => {
        this.scan();
      }, this.options.pollingTime);
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
    if (!this.isValidFile()) {
      return;
    }
    this.upload.start();
  }

  generateId() {
    const { fingerprint } = this.options;
    return fingerprint(this.file, this.options).replace(/[^\dA-Za-z-]/g, '');
  }

  fingerprint(file, options = {}, callback) {
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

    if (callback) {
      return callback(null, `${attributesKey}${print}`);
    }

    return `${attributesKey}${print}`;
  }

  sendPassword(pw) {
    this.waitForPassword = false;
    this.scan({ header: 'Encryption-Password', value: pw });
  }

  isValidSize() {
    if (this.options.maxSize && this.file.size > this.options.maxSize) {
        this.setError('rejected', 'Document is too large');
        return false;
      }

    return true;
  }

  isAllowedFileTypes() {
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

    return true;
  }

  isAllowedFileNameCharacters() {
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


  async recursingUncorruptChecker(obj) {
    await new Promise((resolve,reject) => {
      setTimeout(() => {
        resolve();
        reject();
      }, 100)
    });
    if (obj.isUncorrupt !== -1 ) {
      return obj.isUncorrupt === 1;
    }
    return this.recursingUncorruptChecker(obj);
  }

  isUncorrupt() {
    const obj = {isUncorrupt : -1};
    if (this.file.type === 'image/tiff') {
      const check =  (event: ProgressEvent<FileReader>) => {
          try {
            Tiff.pageCount(event.currentTarget.result);
            obj.isUncorrupt = 1;
          } catch (error) {
            console.log(error);
            this.setError('rejected', 'The tiff file is corrupt.');
            obj.isUncorrupt = 0;
          }
      };
      const fileReader = new FileReader()
      fileReader.addEventListener("loadend", check);
      fileReader.readAsArrayBuffer(this.file);
      return this.recursingUncorruptChecker(obj);
    }
    return true;
  }

  isValidFile() {
    return (
      this.isAllowedFileNameCharacters() &&
      this.isAllowedFileTypes() &&
      this.isValidSize() &&
      this.isUncorrupt()
    );
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
    try {
      this.parseErrorMessage(message, err);
    } catch {
      /* the error callback should always be called */
    }

    for (const cb of this.onError)  cb(err || new Error(this.errorMessage));
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
