import tus from 'tus-js-client';

const defaults = {
  endpoint: '/ms/api/availity/internal/core/vault/upload/v1/resumable',
  start: true,
  chunkSize: 1024, // bytes
};

class Upload {
  constructor(files, options) {
    if (!files) {
      throw Error('[options.files] must be defined and of type File(s)');
    }

    if (!options || !options.bucket) {
      throw Error('[options] and [options.bucket] must be defined');
    }

    this.files = Array.isArray(files) ? files : [files];
    this.options = Object.assign({}, options, defaults);
    this.completed = false;

    if (this.options.start) {
      this.start();
    }
  }

  getToken() {
    return document.cookie.replace(
      /(?:(?:^|.*;\s*)XSRF-TOKEN\s*=\s*([^;]*).*$)|^.*$/,
      '$1'
    );
  }

  start() {
    const { files } = this;

    files.forEach(file => {
      const upload = new tus.Upload(file, {
        resume: true,
        endpoint: `${this.options.endpoint}/${this.options.bucketId}`,
        headers: {
          'X-XSRF-TOKEN': this.getToken(),
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
    });
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
