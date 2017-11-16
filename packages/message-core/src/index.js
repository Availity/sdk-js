class AvMessage {
  constructor() {
    this.isEnabled = true;
    this.DEFAULT_EVENT = 'avMessage';
    this.DOMAIN = /https?:\/\/([\w\d\-]+\.)?availity\.(com|net)/;
    window.addEventListener('message', ::this.getEventData);
  }

  enabled(value) {
    if (arguments.length) {
      this.isEnabled = !!value;
    }
    return this.isEnabled;
  }

  getEventData(event) {
    if (
      !this.isEnabled ||
      !this.onMessage ||
      typeof this.onMessage !== 'function' || // do nothing if not enabled or no onMessage function given
      !event ||
      !event.data ||
      !event.origin ||
      !event.source || // check event exists and has necesary properties
      event.source === window || // don't process messages emitted from the same window
      !this.isDomain(event.origin)
    ) {
      // check origin as trusted domain
      return;
    }

    let data = event.data;

    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) {
        // warn about error
      }
    }

    if (typeof data === 'string') {
      event = data;
      data = undefined;
    } else {
      event = (data && data.event) || this.DEFAULT_EVENT;
    }

    this.onMessage(event, data);
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

  send(payload, target) {
    if (!this.isEnabled || !payload) {
      // ingore send calls if not enabled
      return;
    }
    try {
      const message =
        typeof payload === 'string' ? payload : JSON.stringify(payload);
      target = target || window.parent;
      target.postMessage(message, this.domain());
    } catch (err) {
      console.warn('AvMessage.send() ', err); // eslint-disable-line
    }
  }
}

export default new AvMessage();
