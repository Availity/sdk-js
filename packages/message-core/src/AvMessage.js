import { isCloud, getLocation } from '@availity/env-var';

class AvMessage {
  subscribers = {};

  constructor() {
    this.isEnabled = true;
    this.DEFAULT_EVENT = 'avMessage';
    this.DOMAIN = /https?:\/\/([\w\d-]+\.)?availity\.(com|net)/;
    window.addEventListener('message', this.getEventData);
  }

  enabled(value) {
    if (arguments.length > 0) {
      this.isEnabled = !!value;
    }
    return this.isEnabled;
  }

  getEventData = event => {
    if (
      !this.isEnabled || // do nothing if not enabled
      !event ||
      !event.data ||
      !event.origin ||
      !event.source || // check event exists and has necessary properties
      event.source === window || // don't process messages emitted from the same window
      !this.isDomain(event.origin)
    ) {
      // check origin as trusted domain
      return;
    }

    let { data } = event;

    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (error) {
        // no op
      }
    }

    if (typeof data === 'string') {
      event = data;
      data = undefined;
    } else {
      event = (data && data.event) || this.DEFAULT_EVENT;
    }

    this.onMessage(event, data);
  };

  subscribe(event, fn) {
    if (!this.subscribers[event]) {
      this.subscribers[event] = [];
    }
    this.subscribers[event].push(fn);
    return () => {
      this.subscribers[event] = this.subscribers[event].filter(
        val => val !== fn
      );
    };
  }

  // remove all subscribers for this event
  unsubscribe(event) {
    delete this.subscribers[event];
  }

  unsubscribeAll() {
    this.subscribers = {};
  }

  onMessage(event, data) {
    if (this.subscribers[event]) {
      this.subscribers[event].forEach(fn => {
        fn(data);
      });
    }
  }

  // if current domain doesn't match regex DOMAIN, return true.
  isDomain(url) {
    return !this.DOMAIN.test(this.domain()) || this.DOMAIN.test(url);
  }

  domain() {
    if (window.location.origin) {
      if (document.referrer && isCloud()) {
        const referrerAnchor = getLocation(document.referrer);
        return `${referrerAnchor.protocol}//${referrerAnchor.host}`;
      }
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
      // ingore send calls if not enabled
      return;
    }
    try {
      const message =
        typeof payload === 'string' ? payload : JSON.stringify(payload);
      target.postMessage(message, this.domain());
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn('AvMessage.send()', error);
    }
  }
}

export default AvMessage;
