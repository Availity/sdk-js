/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
declare class Upload {
  constructor(file: any, options: any);

  inStatusCategory(status: number, category: number): boolean;

  scan(data: any): void;

  getPercentage(): number;

  getToken(): string;

  start(): void;

  generateId(): string;

  fingerprint(file: any, options?: any, callback?: (arg: null, key: string) => string): string;

  sendPassword(pw: any): void;

  isValidSize(): boolean;

  isAllowedFileTypes(): boolean;

  isAllowedFileNameCharacters(): boolean;

  isValidFile(): boolean;

  trimFileName(fileName: string): string;

  getResult(xhr: any): { status: string; message: string };

  setError(status: string, message: string, err: any): void;

  parseErrorMessage(message: string, err: any): void;

  abort(): void;
}

export default Upload;
