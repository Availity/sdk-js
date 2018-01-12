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
    this.percentage = 0;
    this.options = Object.assign(options, defaults);
    this.completed = false;
    this.onError = [];
    this.onSuccess = [];
    this.onProgress = [];
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
        this.percentage = bytesSent / bytesTotal * 100;
        this.bytesSent = bytesSent;
        this.bytesTotal = bytesTotal;
        this.onProgress.forEach(cb => cb(bytesSent, bytesTotal));
      },
      onSuccess: () => {
        const xhr = this.upload._xhr; // eslint-disable-line
        this.percentage = 100;
        this.completed = true;
        const references = xhr.getResponseHeader('references');
        if (references) {
          this.references = JSON.parse(references);
        }
        this.onSuccess.forEach(cb => cb());
      },
    });

    this.upload = upload;

    upload.start();
  }
}

export default Upload;
