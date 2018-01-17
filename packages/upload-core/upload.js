import tus from 'tus-js-client';

const defaults = {
  endpoint: '/ms/api/availity/internal/core/vault/upload/v1/resumable',
  chunkSize: 1024, // bytes
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
    this.completed = false;
    this.percentage = 0;
    this.onError = [];
    this.onSuccess = [];
    this.onProgress = [];
    this.bytesTotal = 0;
    this.bytesSent = 0;
    this.bytesScanned = 0;
    this.timeoutID = undefined;
  }

  inStatusCategory(status, category) {
    return status >= category && status < category + 100;
  }

  scan() {
    const xhr = new window.XMLHttpRequest();

    xhr.open('HEAD', this.upload.url, true);
    xhr.setRequestHeader('Tus-Resumable', '1.0.0');
    xhr.setRequestHeader('X-Client-ID', this.options.clientId);
    xhr.setRequestHeader('X-XSRF-TOKEN', this.getToken());

    xhr.onload = () => {
      if (!this.inStatusCategory(xhr.status, 200)) {
        this.onError.forEach(cb => cb(xhr));
        return;
      }

      this.bytesScanned = parseInt(xhr.getResponseHeader('AV-Scan-Bytes'), 10);
      this.percentage = this.getPercentage();
      const result = xhr.getResponseHeader('AV-Scan-Result');

      this.completed = true;
      this.percentage = 100;
      this.onSuccess.forEach(cb => cb());

      if (result === 'accepted') {
        this.completed = true;
        this.percentage = 100;
        const references = xhr.getResponseHeader('references');
        if (references) {
          this.references = JSON.parse(references);
        }
        this.onSuccess.forEach(cb => cb());
        return;
      }

      if (result === 'rejected') {
        clearTimeout(this.timeoutId);
        this.onError.forEach(cb => cb(new Error('File upload rejected')));
        return;
      }

      this.timeoutId = setTimeout(() => {
        this.scan();
      }, 50);
    };

    xhr.onerror = err => {
      this.onError.forEach(cb => cb(err));
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

    const upload = new tus.Upload(file, {
      resume: true,
      endpoint: `${this.options.endpoint}/${this.options.bucketId}/`,
      headers: {
        'X-XSRF-TOKEN': this.getToken(),
        'X-Availity-Customer-ID': this.options.customerId,
        'X-Client-ID': this.options.clientId,
        'Availity-Filename': file.name,
        'Availity-Content-Type': file.type,
      },
      onError: err => {
        this.error = err;
        this.onError.forEach(cb => cb(err));
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
        this.onProgress.forEach(cb => cb());

        const result = xhr.getResponseHeader('AV-Scan-Result');
        if (result === 'accepted') {
          this.completed = true;
          this.percentage = 100;
          const references = xhr.getResponseHeader('references');
          if (references) {
            this.references = JSON.parse(references);
          }
          this.onSuccess.forEach(cb => cb());
          return;
        }

        if (result === 'rejected') {
          this.onError.forEach(cb => cb(new Error('File upload rejected')));
          return;
        }

        this.scan();
      },
    });

    this.upload = upload;

    upload.start();
  }
}

export default Upload;
