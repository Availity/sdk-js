export interface MessagePayload {
  event?: string;
  [key: string]: unknown;
}

export interface SubscribeOptions {
  ignoreSameWindow?: boolean;
}

export type MessageCallback = (data?: MessagePayload | string) => void;

export type Unsubscribe = () => void;

interface Subscriber {
  id: number;
  callback: MessageCallback;
  options: Required<SubscribeOptions>;
}

class AvMessage {
  subscribers: Record<string, Subscriber[]> = {};

  isEnabled = true;

  DEFAULT_EVENT = 'avMessage';

  DOMAIN = /https?:\/\/([\w-]+\.)?availity\.(com|net)/;

  #lastId = 0;

  constructor() {
    window.addEventListener('message', this.getEventData);
  }

  enabled(value?: boolean): boolean {
    if (arguments.length > 0) {
      this.isEnabled = !!value;
    }
    return this.isEnabled;
  }

  getEventData = (event: MessageEvent): void => {
    const isSameWindow = event.source === window;

    if (
      !this.isEnabled || // do nothing if not enabled
      !event ||
      !event.data ||
      !event.origin ||
      !event.source || // check event exists and has necessary properties
      !this.isDomain(event.origin)
    ) {
      // check origin as trusted domain
      return;
    }

    let { data } = event;

    if (typeof data === 'string') {
      try {
        data = JSON.parse(data) as unknown;
      } catch {
        // no op
      }
    }

    let eventName: string;

    if (typeof data === 'string') {
      eventName = data;
      data = undefined;
    } else {
      eventName = (data && (data as MessagePayload).event) || this.DEFAULT_EVENT;
    }

    const metadata = { isSameWindow };

    this.onMessage(eventName, data as MessagePayload | string | undefined, metadata);
  };

  subscribe(event: string, callback: MessageCallback, options?: SubscribeOptions): Unsubscribe {
    if (!this.subscribers[event]) {
      this.subscribers[event] = [];
    }

    this.#lastId += 1;
    const id = this.#lastId;

    const ignoreSameWindow = options?.ignoreSameWindow ?? true;

    const subscriber: Subscriber = { id, callback, options: { ignoreSameWindow } };
    this.subscribers[event].push(subscriber);

    return () => {
      this.subscribers[event] = this.subscribers[event].filter((s) => s.id !== id);
    };
  }

  once(event: string, callback: MessageCallback, options?: SubscribeOptions): Unsubscribe {
    const unsubscribe = this.subscribe(
      event,
      (data) => {
        unsubscribe();
        callback(data);
      },
      options
    );
    return unsubscribe;
  }

  // remove all subscribers for this event
  unsubscribe(event?: string): void {
    if (event) {
      delete this.subscribers[event];
    }
  }

  unsubscribeAll(): void {
    this.subscribers = {};
  }

  onMessage(event: string, data: MessagePayload | string | undefined, metadata: { isSameWindow: boolean }): void {
    const { isSameWindow } = metadata;

    if (this.subscribers[event]) {
      for (const subscriber of this.subscribers[event]) {
        const { ignoreSameWindow } = subscriber.options;
        const skip = isSameWindow && ignoreSameWindow;

        if (!skip) {
          subscriber.callback(data);
        }
      }
    }
  }

  // if current domain doesn't match regex DOMAIN, return true.
  isDomain(url: string): boolean {
    return !this.DOMAIN.test(this.domain()) || this.DOMAIN.test(url);
  }

  /**
   * Attempts to get origin from top window
   * @private
   */
  getOriginFromTop(): string | null {
    try {
      return window.top!.location.origin;
    } catch {
      return null;
    }
  }

  /**
   * Swaps between 'apps' and 'essentials' in the domain
   * @private
   */
  swapDomain(url: string): string {
    if (url.includes('essentials')) {
      return url.replace('essentials', 'apps');
    }
    return url.replace('apps', 'essentials');
  }

  /**
   * Gets the domain
   * @private
   */
  domain(): string {
    const topOrigin = this.getOriginFromTop();

    if (topOrigin) {
      // If we can access top origin, use it directly (same domain scenario)
      return topOrigin;
    }

    // Cross-domain scenario - fall back to domain swapping
    if (window.location.origin) {
      const url = window.location.origin;
      return this.swapDomain(url);
    }

    if (window.location.hostname) {
      const url = `${window.location.protocol}//${window.location.hostname}${
        window.location.port ? `:${window.location.port}` : ''
      }`;
      return this.swapDomain(url);
    }

    return '*';
  }

  send(payload: string | MessagePayload, target: Window | null = window.top): void {
    if (!this.isEnabled || !payload || !target) {
      // ignore send calls if not enabled or no target
      return;
    }
    try {
      const message = typeof payload === 'string' ? payload : JSON.stringify(payload);
      target.postMessage(message, this.domain());
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn('AvMessage.send()', error);
    }
  }

  /**
   * Remove the message event listener. Call this when your app or component
   * unmounts to prevent memory leaks.
   */
  destroy(): void {
    window.removeEventListener('message', this.getEventData);
  }
}

export default AvMessage;
