import flattenObject from '../flattenObject';
import AvMicroservice from '../ms';

class DmaLogMessages extends AvMicroservice {
  constructor({ http, promise, merge, config }) {
    const options = {
      name: 'spc/analytics/log',
      ...config,
    };
    super({
      http,
      promise,
      merge,
      config: options,
    });
  }

  send(level, entries) {
    delete entries.level;
    const payload = { level, entries };
    const flattened = flattenObject(payload);

    flattened.X_Client_ID = this.clientId;
    flattened.X_XSRF_TOKEN = document.cookie.replace(
      /(?:(?:^|.*;\s*)XSRF-TOKEN\s*=\s*([^;]*).*$)|^.*$/,
      '$1'
    );

    const fields = Object.keys(flattened)
      .map((key) => {
        const name = key.replace(/\[\d+]/g, '[]');
        const value = flattened[key];
        return `${name}=${encodeURIComponent(value)}`;
      })
      .join('&');

    return fields;
  }

  debug(entries) {
    return this.sendBeacon(this.send('debug', entries));
  }

  info(entries) {
    return this.sendBeacon(this.send('info', entries));
  }

  warn(entries) {
    return this.sendBeacon(this.send('warn', entries));
  }

  error(entries) {
    return this.sendBeacon(this.send('error', entries));
  }
}

export default DmaLogMessages;
