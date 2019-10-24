declare class AvMessage {
  public subscribers: object;

  public enabled: (value?: boolean) => boolean;

  public subscribe: (eventName?: string, fn: (data?: any) => void) => void;

  public unsubscribe: (eventName?: string) => void;

  public unsubscribeAll: () => void;

  public send: (payload: any, target?: Window) => void;

  private getEventData: (eventData?: any) => void;

  private isDomain: (url: string) => boolean;

  private domain: () => string;
}

export default AvMessage;
