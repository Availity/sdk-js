import flattenObject from '../flattenObject';
import AvMicroservice from '../ms';

export default class DmaLogMessages extends AvMicroservice {
  constructor(config) {
    super({
      name: 'spc/analytics/log',
      ...config,
    });
  }

  send(level, entries) {
    const { level: _level, overrides, ...rest } = entries;
    const payload = { level, entries: rest, overrides };
    const flattened = flattenObject(payload);

    flattened.X_Client_ID = this.clientId;
    flattened.X_XSRF_TOKEN = document.cookie.replace(/(?:(?:^|.*;\s*)XSRF-TOKEN\s*=\s*([^;]*).*$)|^.*$/, '$1');

    const fields = Object.keys(flattened)
      .filter((key) => flattened[key] != null)
      .map((key) => {
        const name = key.replaceAll(/\[\d+]/g, '[]');
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
