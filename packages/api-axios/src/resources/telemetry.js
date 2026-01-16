import set from 'lodash/set';
import AvCloudApi from '../cloud';
import flattenObject from '../flatten-object';

export default class AvTelemetryApi extends AvCloudApi {
  constructor(config) {
    super({
      name: '/appl/analytics/telemetry',
      ...config,
    });
  }

  send(level, data) {
    set(data, 'telemetryBody.level', level);
    const flattened = flattenObject(data);

    const fields = Object.keys(flattened)
      .map((key) => {
        const name = key.replaceAll(/\[\d+]/g, '[]');
        const value = flattened[key];
        return `${name}=${encodeURIComponent(value)}`;
      })
      .join('&');

    return fields;
  }

  debug(data) {
    return this.sendBeacon(this.send('debug', data));
  }

  info(data) {
    return this.sendBeacon(this.send('info', data));
  }

  warn(data) {
    return this.sendBeacon(this.send('warn', data));
  }

  error(data) {
    return this.sendBeacon(this.send('error', data));
  }
}

export const avTelemetryApi = new AvTelemetryApi();
