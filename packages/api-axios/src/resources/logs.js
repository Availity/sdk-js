import AvApi from '../api';
import flattenObject from '../flatten-object';

export default class AvLogMessagesApi extends AvApi {
  constructor(config) {
    super({
      name: 'log-messages',
      ...config,
    });
  }

  send(level, entries) {
    delete entries.level;
    const payload = { level, entries };
    const flattened = flattenObject(payload);

    flattened.X_Client_ID = this.clientId;
    flattened.X_XSRF_TOKEN = document.cookie.replace(/(?:(?:^|.*;\s*)XSRF-TOKEN\s*=\s*([^;]*).*$)|^.*$/, '$1');

    const fields = Object.keys(flattened)
      .map((key) => {
        const name = key.replace(/\[\d+]/g, '[]');
        const value = flattened[key];
        return `${name}=${encodeURIComponent(value)}`;
      })
      .join('&');

    return fields;
  }

  async debug(entries) {
    return this.sendBeacon(this.send('debug', entries));
  }

  async info(entries) {
    return this.sendBeacon(this.send('info', entries));
  }

  async warn(entries) {
    return this.sendBeacon(this.send('warn', entries));
  }

  async error(entries) {
    return this.sendBeacon(this.send('error', entries));
  }
}

export const avLogMessagesApi = new AvLogMessagesApi();
