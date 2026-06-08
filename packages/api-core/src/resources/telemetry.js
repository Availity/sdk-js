import AvMicroservice from '../ms';
import flattenObject from '../flattenObject';

export default class AvTelemetry extends AvMicroservice {
  constructor(config) {
    super({
      name: 'spc/analytics/telemetry',
      ...config,
    });
  }

  send(level, data) {
    data.telemetryBody = data.telemetryBody || {};
    data.telemetryBody.level = level;
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
