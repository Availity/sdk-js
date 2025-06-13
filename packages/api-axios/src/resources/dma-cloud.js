import flattenObject from '../flatten-object';
import AvMicroserviceApi from '../ms';

export default class AvLogMessagesApiV3 extends AvMicroserviceApi {
  constructor(config) {
    super({
      name: 'appl/analytics/log',
      path: '/cloud/web/',
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
        const name = key.replaceAll(/\[\d+]/g, '[]');
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

export const avLogMessagesApiV3 = new AvLogMessagesApiV3();
