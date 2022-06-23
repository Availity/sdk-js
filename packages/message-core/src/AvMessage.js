class AvMessage {
  subscribers = {};

  constructor() {
    this.isEnabled = true;
    this.DEFAULT_EVENT = 'avMessage';
    this.DOMAIN = /https?:\/\/([\w-]+\.)?availity\.(com|net)/;
    window.addEventListener('message', this.getEventData);
  }

  enabled(value) {
    if (arguments.length > 0) {
      this.isEnabled = !!value;
    }
    return this.isEnabled;
  }

  getEventData = (event) => {
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
        data = JSON.parse(data);
      } catch {
        // no op
      }
    }

    if (typeof data === 'string') {
      event = data;
      data = undefined;
    } else {
      event = (data && data.event) || this.DEFAULT_EVENT;
    }

    const metadata = { isSameWindow };

    this.onMessage(event, data, metadata);
  };

  #lastId = 0;

  subscribe(event, callback, options) {
    if (!this.subscribers[event]) {
      this.subscribers[event] = [];
    }

    this.#lastId += 1;
    const id = this.#lastId;

    const ignoreSameWindow = options?.ignoreSameWindow === undefined ? true : options.ignoreSameWindow;

    const subscriber = { id, callback, options: { ignoreSameWindow } };
    this.subscribers[event].push(subscriber);

    return () => {
      this.subscribers[event] = this.subscribers[event].filter((subscriber) => subscriber.id !== id);
    };
  }

  // remove all subscribers for this event
  unsubscribe(event) {
    delete this.subscribers[event];
  }

  unsubscribeAll() {
    this.subscribers = {};
  }

  onMessage(event, data, metadata) {
    const { isSameWindow } = metadata;

    if (this.subscribers[event]) {
      for (const subscriber of this.subscribers[event]) {
        const ignoreSameWindow = !!subscriber.options?.ignoreSameWindow;
        const skip = isSameWindow && ignoreSameWindow;

        if (!skip) {
          subscriber.callback(data);
        }
      }
    }
  }

  // if current domain doesn't match regex DOMAIN, return true.
  isDomain(url) {
    return !this.DOMAIN.test(this.domain()) || this.DOMAIN.test(url);
  }

  domain() {
    if (window.location.origin) {
      return window.location.origin;
    }

    if (window.location.hostname) {
      return `${window.location.protocol}//${window.location.hostname}${
        window.location.port ? `:${window.location.port}` : ''
      }`;
    }

    return '*';
  }

  send(payload, target = window.top) {
    if (!this.isEnabled || !payload) {
      // ignore send calls if not enabled
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
}

export default AvMessage;
