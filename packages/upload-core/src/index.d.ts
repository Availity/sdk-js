import type { Upload as TusUpload, UploadOptions } from '@types/tus-js-client';

export interface Options extends UploadOptions {
  bucketId: string;
  customerId: string;
  clientId: string;
  allowedFileNameCharacters?: string;
  endpoint?: string;
  fileTypes?: `.${string}`[];
  maxAvScanRetries?: number;
  maxSize?: number;
  metadata?: Record<string, unknown>;
  onPreStart?: ((upload: Upload) => boolean)[];
  pollingTime?: number;
  stripFileNamePathSegments?: boolean;
}

declare class Upload {
  upload: TusUpload;

  options: Options;

  file: File;

  id: string;

  avScanRetries: number;

  bytesScanned: number;

  bytesSent: number;

  bytesTotal: number;

  error: Error | null;

  errorMessage: string | null;

  onError: ((error: Error) => void)[];

  onPreStart: (() => boolean)[];

  onProgress: (() => void)[];

  onSuccess: (() => void)[];

  percentage: number;

  preStartValidationResults: boolean[];

  references: string[];

  s3References: string[];

  status: 'accepted' | 'pending' | 'rejected' | 'encrypted' | 'decrypting';

  timeoutId: NodeJS.Timeout | undefined;

  waitForPassword: boolean;

  constructor(file: File, options: Options);

  abort(): void;

  fingerprint(file: File, options?: Options, callback?: (arg: null, key: string) => string): string;

  generateId(): string;

  getPercentage(): number;

  getResult(xhr: XMLHttpRequest): { status: string; message: string };

  getToken(): string;

  inStatusCategory(status: number, category: number): boolean;

  isAllowedFileNameCharacters(): boolean;

  isAllowedFileTypes(): boolean;

  isValidFile(): boolean;

  isValidSize(): boolean;

  parseErrorMessage(message: string, error?: Error): void;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  scan(data: any): void;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sendPassword(pw: any): void;

  setError(status: string, message: string, error?: Error): void;

  start(): void;

  trimFileName(fileName: string): string;
}

export default Upload;
