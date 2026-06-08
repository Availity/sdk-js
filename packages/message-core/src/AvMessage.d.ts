export interface MessagePayload {
  event?: string;
  [key: string]: unknown;
}

export interface SubscribeOptions {
  ignoreSameWindow?: boolean;
}

export type MessageCallback = (data?: MessagePayload | string) => void;

export type Unsubscribe = () => void;

declare class AvMessage {
  subscribers: Record<string, Array<{ id: number; callback: MessageCallback; options: SubscribeOptions }>>;

  isEnabled: boolean;

  DEFAULT_EVENT: string;

  DOMAIN: RegExp;

  enabled(value?: boolean): boolean;

  subscribe(event: string, callback: MessageCallback, options?: SubscribeOptions): Unsubscribe;

  unsubscribe(event: string): void;

  unsubscribeAll(): void;

  onMessage(event: string, data: MessagePayload | string | undefined, metadata: { isSameWindow: boolean }): void;

  send(payload: string | MessagePayload, target?: Window): void;

  destroy(): void;
}

export default AvMessage;
