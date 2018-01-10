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
        onError: err => {
          this.onError(err);
        },
        onProgress: (bytesSent, bytesTotal) => {
          this.onProgress(bytesSent, bytesTotal);
        },
        onSuccess: () => {
          this.onSuccessCallback();
        },
      });

      this.upload = upload;

      upload.start();
    }
  }

  onError(err) {
    console.log(err); // eslint-disable-line
  }

  onProgress(bytesUploaded, bytesTotal) {
    const percentage = (bytesUploaded / bytesTotal * 100).toFixed(2);
    console.log('%s complete for %s', percentage, this.upload.file.name); // eslint-disable-line
  }

  onSuccessCallback() {
    const xhr = this.upload._xhr; // eslint-disable-line

    const references = xhr.getResponseHeader('references');
    if (references) {
      this.references = JSON.parse(references);
    }

    this.onSuccess();
  }

  onSuccess() {
    console.log('download %s from %s', this.upload.file.name, this.upload.url); // eslint-disable-line
    if (this.references) {
      console.log('references %s', this.responses.join(',')); // eslint-disable-line
    }
  }
}

export default Upload;
