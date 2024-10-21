import type { Upload as TusUpload, UploadOptions } from '@types/tus-js-client';

export interface Options extends UploadOptions {
  bucketId: string;
  customerId: string;
  clientId: string;
  maxAvScanRetries?: number;
  onPreStart?: (() => boolean)[];
  pollingTime?: number;
  retryDelays?: number[];
  stripFileNamePathSegments?: boolean;
}

export type FileUpload = File | Blob | Pick<ReadableStreamDefaultReader, 'read'>;

declare class Upload {
  private upload: TusUpload;

  private options: Options;

  private status: 'accepted' | 'pending' | 'rejected' | 'decrypting';

  private errorMessage: string;

  private onSuccess: (() => void)[];

  private onError: ((error: Error) => void)[];

  constructor(file: FileUpload, options: Options);

  inStatusCategory(status: number, category: number): boolean;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  scan(data: any): void;

  getPercentage(): number;

  getToken(): string;

  start(): void;

  generateId(): string;

  fingerprint(file: FileUpload, options?: Options, callback?: (arg: null, key: string) => string): string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sendPassword(pw: any): void;

  isValidSize(): boolean;

  isAllowedFileTypes(): boolean;

  isAllowedFileNameCharacters(): boolean;

  isValidFile(): boolean;

  trimFileName(fileName: string): string;

  getResult(xhr: XMLHttpRequest): { status: string; message: string };

  setError(status: string, message: string, error?: Error): void;

  parseErrorMessage(message: string, error?: Error): void;

  abort(): void;
}

export default Upload;
