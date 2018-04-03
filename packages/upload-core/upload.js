import tus from 'tus-js-client';

const defaults = {
  endpoint: '/ms/api/availity/internal/core/vault/upload/v1/resumable',
  chunkSize: 3e6, // 3MB
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
    this.options = Object.assign(options, defaults);
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
  }

  inStatusCategory(status, category) {
    return status >= category && status < category + 100;
  }

  scan() {
    const xhr = new window.XMLHttpRequest();

    xhr.open('HEAD', this.upload.url, true);
    xhr.setRequestHeader('Tus-Resumable', '1.0.0');
    xhr.setRequestHeader('X-Client-ID', this.options.clientId);
    xhr.setRequestHeader('X-Availity-Customer-ID', this.options.customerId);
    xhr.setRequestHeader('X-XSRF-TOKEN', this.getToken());

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
        clearTimeout(this.timeoutId);
        return;
      }

      if (result.status === 'accepted') {
        this.percentage = 100;
        this.status = result.status;
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

    if (!this.isValidFile(file)) {
      return;
    }

    const upload = new tus.Upload(file, {
      resume: true,
      endpoint: `${this.options.endpoint}/${this.options.bucketId}/`,
      chunkSize: this.options.chunkSize,
      metadata: {
        'availity-filename': file.name,
        'availity-content-type': file.type,
        'availity-attachment-name': file.name,
      },
      headers: {
        'X-XSRF-TOKEN': this.getToken(),
        'X-Availity-Customer-ID': this.options.customerId,
        'X-Client-ID': this.options.clientId,
        'Availity-Filename': file.name,
        'Availity-Content-Type': file.type,
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
        const xhr = this.upload._xhr; // eslint-disable-line
        this.bytesScanned =
          parseInt(xhr.getResponseHeader('AV-Scan-Bytes'), 10) || 0;
        this.percentage = this.getPercentage();

        const result = this.getResult(xhr);

        if (result.status === 'accepted') {
          this.percentage = 100;
          this.status = result.status;
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
    this.id = this.upload.options.fingerprint(this.file);

    upload.start();
  }

  isValidFile(file) {
    if (this.options.fileTypes) {
      if (!file.name) {
        return false;
      }
      const fileName = file.name;
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
      if (file.size > this.options.maxSize) {
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
    const msg = xhr.getResponseHeader('Upload-Message');
    if (scanResult === 'rejected') {
      return { status: scanResult, message: msg || 'File scan failed' };
    }

    if (uploadResult === 'rejected') {
      return { status: uploadResult, message: msg || 'File upload rejected' };
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
    if (this.errorMessage) {
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
