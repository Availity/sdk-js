import { Upload as TusUpload } from 'tus-js-client';
import resolveUrl from '@availity/resolve-url';

// https://stackoverflow.com/questions/6122571/simple-non-secure-hash-function-for-javascript/8831937#8831937
const hashCode = (str) => {
  let hash = 0;
  if (str.length === 0) return hash;
  for (let i = 0; i < str.length; i++) {
    // eslint-disable-next-line unicorn/prefer-code-point
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char; // eslint-disable-line no-bitwise
    // eslint-disable-next-line operator-assignment
    hash = hash & hash; // eslint-disable-line no-bitwise
  }
  return hash;
};

function isXhr(data) {
  return !!data?.getResponseHeader;
}

const defaultOptions = {
  endpoint: '/ms/api/availity/internal/core/vault/upload/v1/resumable',
  chunkSize: 6e6, // 6MB (Max size from backend is 5MiB. Setting to 6MB to be safe)
  removeFingerprintOnSuccess: true,
  pollingTime: 5000,
  retryDelays: [0, 1000, 3000, 5000],
  stripFileNamePathSegments: true,
  onPreStart: [],
  maxAvScanRetries: 10,
  async fingerprint(file, options = {}, callback) {
    const attributes = [file.name, file.type, file.size, file.lastModified];
    let attributesKey = 'tus-';
    for (const attribute of attributes) {
      if (attribute) {
        attributesKey += `${attribute}-`;
      }
    }

    const keys = Object.keys(options.metadata || {}).map((key) => options.metadata[key]);
    const signature = [attributes.toString().replaceAll(',', ''), options.endpoint, keys].join('');

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
      throw new Error('[file] must be defined and of type File(s)');
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
    this.preStartValidationResults = [];
    this.percentage = 0;
    this.onError = [];
    this.onSuccess = [];
    this.onPreStart = this.options.onPreStart;
    this.onProgress = [];
    this.bytesTotal = 0;
    this.bytesSent = 0;
    this.bytesScanned = 0;
    this.errorMessage = null;
    this.status = 'pending';
    this.timeoutId = undefined;
    this.error = null;
    this.waitForPassword = true;
    this.avScanRetries = 0;
    this.references = [];
    this.s3References = [];

    const fileName = this.trimFileName(file.name);

    const metadata = {
      'availity-filename': fileName,
      'availity-content-type': file.type,
      'availity-attachment-name': 'N/A',
    };
    Object.assign(metadata, this.options.metadata);

    const upload = new TusUpload(this.file, {
      // resume: true,
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
      onError: (err) => {
        this.setError('rejected', 'Network Error', err);
        this.error = err;
      },
      onProgress: (bytesSent, bytesTotal) => {
        this.bytesSent = bytesSent;
        this.bytesTotal = bytesTotal;
        this.percentage = this.getPercentage();

        for (const handleOnProgress of this.onProgress) {
          handleOnProgress();
        }
      },
      onSuccess: (response) => {
        const { headers } = response.lastResponse._response;

        this.bytesScanned = Number.parseInt(headers['AV-Scan-Bytes'], 10) || 0;
        this.percentage = this.getPercentage();

        const result = this.getResult(response.lastResponse._response);

        if (result.status === 'accepted') {
          this.percentage = 100;
          this.status = result.status;
          this.errorMessage = null;

          if (headers.references) {
            this.references = JSON.parse(headers.references);
          }

          if (headers['s3-references']) {
            this.s3References = JSON.parse(headers['s3-references']);
          }

          for (const handleOnSuccess of this.onSuccess) {
            handleOnSuccess();
          }

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

    this.generateId();
  }

  inStatusCategory(status, category) {
    return status >= category && status < category + 100;
  }

  scan(data) {
    clearTimeout(this.timeoutId);

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
        this.setError('rejected', `Invalid status returned: ${xhr.status}`, xhr);

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
        const s3References = xhr.getResponseHeader('s3-references');

        if (references) {
          this.references = JSON.parse(references);
        }

        if (s3References) {
          this.s3References = JSON.parse(s3References);
        }

        for (const handleOnSuccess of this.onSuccess) {
          handleOnSuccess();
        }

        return;
      }

      if (result.status === 'decrypting') {
        this.setError(result.status, result.message);
      }

      for (const handleOnProgress of this.onProgress) {
        handleOnProgress();
      }

      if (this.avScanRetries > this.options.maxAvScanRetries) {
        this.setError('rejected', 'AV scan timed out, max retries exceeded');
        return;
      }

      this.timeoutId = setTimeout(() => {
        this.avScanRetries += 1;
        this.scan();
      }, this.options.pollingTime);
    };

    // eslint-disable-next-line unicorn/prefer-add-event-listener
    xhr.onerror = (err) => {
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
    return document.cookie.replace(/(?:(?:^|.*;\s*)XSRF-TOKEN\s*=\s*([^;]*).*$)|^.*$/, '$1');
  }

  start() {
    if (!this.isValidFile()) {
      return;
    }

    // if callback condition fails, push failure onto array
    for (const handleOnPreStart of this.onPreStart) {
      const validationResult = handleOnPreStart(this);
      this.preStartValidationResults.push(validationResult); // some T/F value
    }

    if (this.preStartValidationResults.some((result) => !result)) {
      // If preStartValidation failed but dev did not set an error
      if (this.status === 'pending') {
        this.setError('rejected', 'preStart validation failed');
      }
      return;
    }

    this.upload.start();
  }

  async generateId() {
    const { fingerprint } = this.options;
    const id = await fingerprint(this.file, this.options);

    this.id = id.replaceAll(/[^\dA-Za-z-]/g, '');

    return this.id;
  }

  async fingerprint(file, options = {}, callback) {
    const attributes = [file.name, file.type, file.size, file.lastModified];
    let attributesKey = 'tus-';

    for (const attribute of attributes) {
      if (attribute) {
        attributesKey += `${attribute}-`;
      }
    }

    const keys = Object.keys(options.metadata || {}).map((key) => options.metadata[key]);
    const signature = [attributes.toString().replaceAll(',', ''), options.endpoint, keys].join('');

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
      const fileExt = fileName.substring(fileName.lastIndexOf('.')).toLowerCase();

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
      const fileName = this.file.name.substring(0, this.file.name.lastIndexOf('.'));
      const regExp = new RegExp(`([^${this.options.allowedFileNameCharacters}])`, 'g');

      if (fileName && fileName.match(regExp) !== null) {
        this.setError('rejected', 'File name contains characters not allowed');
        return false;
      }
    }

    return true;
  }

  isValidFile() {
    return this.isAllowedFileNameCharacters() && this.isAllowedFileTypes() && this.isValidSize();
  }

  trimFileName(fileName) {
    if (this.options.stripFileNamePathSegments) {
      fileName = fileName.substring(fileName.lastIndexOf('\\') + 1);
      fileName = fileName.substring(fileName.lastIndexOf('/') + 1);
    }
    return fileName;
  }

  getScanResult(scanResult, uploadResult, decryptResult, msg) {
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
      if (!this.waitForPassword && (decryptResult === null || decryptResult === 'pending')) {
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

  getResult(response) {
    if (isXhr(response)) {
      const scanResult = response.getResponseHeader('AV-Scan-Result');
      const uploadResult = response.getResponseHeader('Upload-Result');
      const decryptResult = response.getResponseHeader('Decryption-Result');
      const msg = response.getResponseHeader('Upload-Message');

      return this.getScanResult(scanResult, uploadResult, decryptResult, msg);
    }

    const scanResult = response.headers['av-scan-result'];
    const uploadResult = response.headers['upload-result'];
    const decryptResult = response.headers['decryption-result'];
    const msg = response.headers['upload-message'];

    return this.getScanResult(scanResult, uploadResult, decryptResult, msg);
  }

  setError(status, message, error) {
    this.status = status;
    try {
      this.parseErrorMessage(message, error);
    } catch {
      /* the error callback should always be called */
    }

    for (const handleOnError of this.onError) {
      handleOnError(error || new Error(this.errorMessage));
    }
  }

  parseErrorMessage(message, error) {
    if (error) {
      let msg = error.originalRequest.getResponseHeader('Upload-Message');

      if (!msg) {
        const temp = error.message.match(/response\Wtext:\W(.*)\)/);
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
