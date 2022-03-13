/* eslint-disable @typescript-eslint/no-explicit-any */
declare class AvMessage {
  // eslint-disable-next-line @typescript-eslint/ban-types
  public subscribers: object;

  public enabled: (value?: boolean) => boolean;

  public subscribe: (eventName?: string, fn: (data?: any) => void) => () => void;

  public unsubscribe: (eventName?: string) => void;

  public unsubscribeAll: () => void;

  public send: (payload: any, target?: Window) => void;

  private getEventData: (eventData?: any) => void;

  private isDomain: (url: string) => boolean;

  private domain: () => string;
}

export default AvMessage;
