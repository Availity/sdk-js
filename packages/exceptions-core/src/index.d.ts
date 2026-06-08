export interface ExceptionMessage {
  errorDate: string;
  errorName: string;
  errorMessage: string;
  errorStack: string;
  url: string;
  appId: string | number;
  appVersion: string;
  userAgent: string;
  userLanguage?: string;
  referrer?: string;
  host?: string;
  totalHits: number;
  currentHits: number;
  [key: string]: unknown;
}

declare class AvExceptions {
  constructor(log: (message: ExceptionMessage) => unknown);

  log: (message: ExceptionMessage) => unknown;

  isEnabled: boolean;

  thisAppId: string | number | undefined;

  BLACKLISTED_MESSAGES: string[];

  REPEAT_LIMIT: number;

  errorMessage?: Record<string, unknown> | ((exception: Error) => Record<string, unknown>);

  submitError(error: Error): void;

  onReport(errorReport: Error): void;

  enabled(value?: boolean): boolean;

  destroy(): void;

  appId(id?: string | number): string | number | undefined;

  repeatTime(time?: number): number;

  prettyPrint(stackFrames: Array<{ toString(): string }>): string;

  isRepeatError(exception: Error): boolean;

  isBlacklisted(exception: Error): boolean;

  repeatTimer(message: string): void;

  onError(exception: Error, skipRepeat?: boolean): Promise<unknown> | undefined;
}

export default AvExceptions;
