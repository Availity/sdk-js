/* eslint-disable @typescript-eslint/no-explicit-any */
declare class AvExceptions {
  constructor(log: (message: string) => void);

  submitError(error: any): void;

  onReport(errorReport: any): void;

  enabled(value: any, ...args: any[]): boolean;

  appId(id: any): string | number;

  repeatTime(time: any): number;

  prettyPrint(stackFrames: any): any;

  isRepeatError(exception: any): any;

  repeatTimer(message: any): void;

  onError(exception: any, skipRepeat?: boolean): Promise<any>;
}

export default AvExceptions;
