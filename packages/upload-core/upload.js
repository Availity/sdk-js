import tus from 'tus-js-client';

const defaults = {
  endpoint: '/ms/api/availity/internal/core/vault/upload/v1/resumable',
  chunkSize: 1024, // bytes
};

class Upload {
  constructor(files, options) {
    if (!files) {
      throw Error('[options.files] must be defined and of type File(s)');
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

    this.files = files;
    this.options = Object.assign(options, defaults);
    this.completed = false;
  }

  getToken() {
    return document.cookie.replace(
      /(?:(?:^|.*;\s*)XSRF-TOKEN\s*=\s*([^;]*).*$)|^.*$/,
      '$1'
    );
  }

  start() {
    const { files } = this;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const upload = new tus.Upload(file, {
        resume: true,
        endpoint: `${this.options.endpoint}/${this.options.bucketId}/`,
        headers: {
          'X-XSRF-TOKEN': this.getToken(),
          'X-Availity-Customer-ID': this.options.customerId,
          'X-Client-ID': this.options.clientId,
        },
        onError: (...args) => {
          this.onError(upload, args);
        },
        onProgress: (...args) => {
          this.onProgress(upload, args);
        },
        onSuccess: (...args) => {
          this.onSucess(upload, args);
        },
      });

      upload.start();
    }
  }

  onError(upload, err) {
    console.log(err); // eslint-disable-line
  }

  onProgress(upload, bytesUploaded, bytesTotal) {
    const percentage = (bytesUploaded / bytesTotal * 100).toFixed(2);
    console.log('%s complete for %s', percentage, upload.file.name); // eslint-disable-line
  }

  onSuccess(upload) {
    console.log('download %s from %s', upload.file.name, upload.url); // eslint-disable-line
  }
}

export default Upload;
