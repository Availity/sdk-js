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
        this.status = 'rejected';
        this.errorMessage = `Invalid status returned: ${xhr.status}`;
        this.onError.forEach(cb => cb(xhr));
        return;
      }

      this.bytesScanned = parseInt(xhr.getResponseHeader('AV-Scan-Bytes'), 10);
      this.percentage = this.getPercentage();
      const result = xhr.getResponseHeader('AV-Scan-Result');

      this.onProgress.forEach(cb => cb());

      if (result === 'accepted') {
        this.percentage = 100;
        this.status = result;
        const references = xhr.getResponseHeader('references');
        if (references) {
          this.references = JSON.parse(references);
        }
        this.onSuccess.forEach(cb => cb());
        return;
      }

      if (result === 'rejected') {
        clearTimeout(this.timeoutId);
        this.errorMessage = 'Failed Virus Scan';
        this.status = result;
        this.onError.forEach(cb => cb(new Error('Failed Virus Scan')));
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
      chunkSize: this.options.chunkSize,
      headers: {
        'X-XSRF-TOKEN': this.getToken(),
        'X-Availity-Customer-ID': this.options.customerId,
        'X-Client-ID': this.options.clientId,
        'Availity-Filename': file.name,
        'Availity-Content-Type': file.type,
      },
      onError: err => {
        this.error = err;
        this.errorMessage = 'Network Error';
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
        const result = xhr.getResponseHeader('AV-Scan-Result');
        this.percentage = this.getPercentage();

        if (result === 'accepted') {
          this.percentage = 100;
          this.status = result;
          const references = xhr.getResponseHeader('references');
          if (references) {
            this.references = JSON.parse(references);
          }
          this.onSuccess.forEach(cb => cb());
          return;
        }

        if (result === 'rejected') {
          this.status = result;
          this.errorMessage = 'File upload rejected';
          this.onError.forEach(cb => cb(new Error('File upload rejected')));
          return;
        }

        this.scan();
      },
    });
    this.upload = upload;
    this.id = this.upload.options.fingerprint(this.file);

    upload.start();
  }

  abort() {
    if (this.upload) {
      this.upload.abort();
    }
  }
}

export default Upload;
