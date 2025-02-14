import {
  DetailedError,
  HttpResponse,
  Upload as TusUpload,
  UploadOptions as TusUploadOptions,
  OnSuccessPayload,
} from 'tus-js-client';
import resolveUrl from '@availity/resolve-url';

import HttpStack from './http-stack';
import { createFingerprint, isDetailedError } from './util';

export type UploadOptions = {
  bucketId: string;
  customerId: string;
  clientId: string;
  allowedFileNameCharacters?: string;
  endpoint?: string;
  fileTypes?: string[];
  fingerprint?: (
    file: File,
    options: TusUploadOptions,
    callback?: (data: null, key: string) => string
  ) => Promise<string>;
  maxAvScanRetries?: number;
  maxSize?: number;
  onPreStart?: ((upload: Upload) => boolean)[];
  pollingTime?: number;
  retryDelays?: number[];
  stripFileNamePathSegments?: boolean;
} & Omit<TusUploadOptions, 'onProgress' | 'onSuccess' | 'onError' | 'fingerprint'>;

const defaultOptions = {
  endpoint: '/ms/api/availity/internal/core/vault/upload/v1/resumable',
  chunkSize: 6e6, // 6MB (Max size from backend is 5MiB. Setting to 6MB to be safe)
  removeFingerprintOnSuccess: true,
  pollingTime: 5000,
  retryDelays: [0, 1000, 3000, 5000],
  stripFileNamePathSegments: true,
  onPreStart: [],
  maxAvScanRetries: 10,
  fingerprint: createFingerprint,
};

class Upload {
  file: File;

  options: UploadOptions & {
    endpoint: string;
    maxAvScanRetries: number;
    retryDelays: number[];
    fingerprint: (
      file: File,
      options: TusUploadOptions,
      callback?: (data: null, key: string) => string
    ) => Promise<string>;
  };

  upload: TusUpload;

  avScanRetries: number;

  bytesScanned: number;

  bytesSent: number;

  bytesTotal: number;

  error: Error | null;

  errorMessage?: string;

  id: string;

  onError: ((error: Error) => void)[];

  onPreStart: ((upload: Upload) => boolean)[];

  onProgress: (() => void)[];

  onSuccess: ((response: OnSuccessPayload) => void)[];

  percentage: number;

  preStartValidationResults: boolean[];

  references: string[];

  s3References: string[];

  status: string;

  timeoutId?: NodeJS.Timeout;

  waitForPassword: boolean;

  constructor(file: File, options: UploadOptions) {
    if (!file) {
      throw new Error('[file] must be defined and of type File');
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

    this.avScanRetries = 0;
    this.bytesScanned = 0;
    this.bytesSent = 0;
    this.bytesTotal = 0;
    this.error = null;
    this.errorMessage = '';
    this.id = '';
    this.onError = [];
    this.onPreStart = this.options.onPreStart || [];
    this.onProgress = [];
    this.onSuccess = [];
    this.percentage = 0;
    this.preStartValidationResults = [];
    this.references = [];
    this.s3References = [];
    this.status = 'pending';
    this.timeoutId = undefined;
    this.waitForPassword = true;

    const fileName = this.trimFileName(file.name);

    const metadata = {
      'availity-filename': fileName,
      'availity-content-type': file.type,
      'availity-attachment-name': 'N/A',
    };
    Object.assign(metadata, this.options.metadata);

    const upload = new TusUpload(this.file, {
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
      httpStack: new HttpStack(),
      onError: (error) => {
        this.setError('rejected', 'Network Error', error);
        this.error = error;
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
        this.bytesScanned = Number.parseInt(response.lastResponse.getHeader('AV-Scan-Bytes') || '0', 10);
        this.percentage = this.getPercentage();

        const result = this.getResult(response.lastResponse);

        if (result.status === 'accepted') {
          this.percentage = 100;
          this.status = result.status;
          this.errorMessage = '';
          this.error = null;

          const references = response.lastResponse.getHeader('references');
          const s3References = response.lastResponse.getHeader('s3-references');

          if (references) {
            this.references = JSON.parse(references);
          }

          if (s3References) {
            this.s3References = JSON.parse(s3References);
          }

          for (const handleOnSuccess of this.onSuccess) {
            handleOnSuccess(response);
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
  }

  inStatusCategory(status: number, category: number) {
    return status >= category && status < category + 100;
  }

  async scan(data?: { header: string; value: string }) {
    clearTimeout(this.timeoutId);

    try {
      const http = new HttpStack();
      const request = http.createRequest('HEAD', this.upload.url || this.options.endpoint);

      const headers: Record<string, string> = {
        'Tus-Resumable': '1.0.0',
        'X-Client-ID': this.options.clientId,
        'X-Availity-Customer-ID': this.options.customerId,
        'X-XSRF-TOKEN': this.getToken(),
      };

      if (data) {
        headers[data.header] = data.value;
      }

      for (const [key, value] of Object.entries(headers)) {
        request.setHeader(key, value);
      }

      const response = await request.send();

      // Check response code
      if (!this.inStatusCategory(response.getStatus(), 200)) {
        this.setError('rejected', `Invalid status returned: ${response.getStatus()}`);

        return;
      }

      // Parse progress
      this.bytesScanned = Number.parseInt(response.getHeader('AV-Scan-Bytes') || '0', 10);
      this.percentage = this.getPercentage();

      const result = this.getResult(response);

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
        this.errorMessage = '';
        this.error = null;

        const references = response.getHeader('references');
        const s3References = response.getHeader('s3-references');

        if (references) {
          this.references = JSON.parse(references);
        }

        if (s3References) {
          this.s3References = JSON.parse(s3References);
        }

        for (const handleOnSuccess of this.onSuccess) {
          handleOnSuccess({ lastResponse: response });
        }

        return;
      }

      if (result.status === 'decrypting') {
        this.setError(result.status, result.message);
      }

      for (const handleOnProgress of this.onProgress) {
        handleOnProgress();
      }
    } catch (error: unknown) {
      this.setError('rejected', 'Network Error', error as Error);
      this.error = error as Error;
    }

    // Retry logic
    if (this.avScanRetries > this.options.maxAvScanRetries) {
      this.setError('rejected', 'AV scan timed out, max retries exceeded');
      return;
    }

    this.timeoutId = setTimeout(() => {
      this.avScanRetries += 1;
      this.scan();
    }, this.options.pollingTime);
  }

  getPercentage() {
    if (!this.bytesTotal) return 0;

    const processedBytes = this.bytesSent + this.bytesScanned;
    const combinedTotalBytes = this.bytesTotal * 2;

    return (processedBytes / combinedTotalBytes) * 100;
  }

  getToken() {
    return document.cookie.replace(/(?:(?:^|.*;\s*)XSRF-TOKEN\s*=\s*([^;]*).*$)|^.*$/, '$1');
  }

  start() {
    // Abort on invalid file
    if (!this.isValidFile()) {
      return;
    }

    if (!this.id) {
      this.setError(
        'rejected',
        'No id set. Call `generateId` or set one manually with `setId` before calling `start`.'
      );
      return;
    }

    // Run validation. Save results in an array
    for (const handleOnPreStart of this.onPreStart) {
      this.preStartValidationResults.push(handleOnPreStart(this));
    }

    // If any check failed, then set error and abort
    if (this.preStartValidationResults.some((result) => !result)) {
      if (this.status === 'pending') {
        this.setError('rejected', 'preStart validation failed');
      }
      return;
    }

    this.upload.start();
  }

  setId(id: string) {
    this.id = id;
  }

  async generateId() {
    const { fingerprint } = this.options;
    const id = await fingerprint(this.file, this.options);

    this.setId(id.replaceAll(/[^\dA-Za-z-]/g, ''));

    return this.id;
  }

  async fingerprint(file: File, options: TusUploadOptions, callback: (data: null, key: string) => string) {
    return createFingerprint(file, options, callback);
  }

  sendPassword(pw: string) {
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
    if (!this.options.fileTypes || this.options.fileTypes.length === 0) return true;

    if (!this.file.name) return false;

    const fileName = this.file.name;
    const fileExt = fileName.substring(fileName.lastIndexOf('.')).toLowerCase();

    // Convert all file types to lowercase
    this.options.fileTypes = this.options.fileTypes.map((type) => type.toLowerCase());

    // Check if ext is in allowed list
    if (!this.options.fileTypes.includes(fileExt)) {
      this.setError('rejected', `Document type ${fileExt} is not allowed`);
      return false;
    }

    return true;
  }

  isAllowedFileNameCharacters() {
    if (!this.options.allowedFileNameCharacters) return true;

    const fileName = this.file.name.substring(0, this.file.name.lastIndexOf('.'));
    const regExp = new RegExp(`([^${this.options.allowedFileNameCharacters}])`, 'g');

    if (fileName.match(regExp) !== null) {
      this.setError('rejected', 'File name contains characters not allowed');
      return false;
    }

    return true;
  }

  isValidFile() {
    return this.isAllowedFileNameCharacters() && this.isAllowedFileTypes() && this.isValidSize();
  }

  trimFileName(fileName: string) {
    if (this.options.stripFileNamePathSegments) {
      fileName = fileName.substring(fileName.lastIndexOf('\\') + 1);
      fileName = fileName.substring(fileName.lastIndexOf('/') + 1);
    }

    return fileName;
  }

  getResult(response: HttpResponse) {
    const scanResult = response.getHeader('av-scan-result');
    const uploadResult = response.getHeader('upload-result');
    const decryptResult = response.getHeader('decryption-result');
    const msg = response.getHeader('upload-message');

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
      // Needs pw, isDecrypting, isScanning
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

  setError(status: string, message: string, error?: Error | DetailedError) {
    this.status = status;

    try {
      this.parseErrorMessage(message, error);
    } catch {
      // The error callback should always be called
    }

    for (const handleOnError of this.onError) {
      handleOnError(error || new Error(this.errorMessage));
    }
  }

  parseErrorMessage(message: string, error?: Error | DetailedError) {
    if (error) {
      let msg = '';

      if (isDetailedError(error)) {
        msg = error.originalRequest.getHeader('Upload-Message') || '';
      }

      if (!msg) {
        msg = error.message;
      }

      if (msg) {
        this.errorMessage = msg;
        return;
      }
    }

    this.errorMessage = message;
  }

  abort() {
    if (this.upload) {
      this.upload.abort();
    }
  }
}

export default Upload;
