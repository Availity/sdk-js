import { AvApi } from '../resource';

export default class AvLogMessages extends AvApi {
  constructor(http, promise, config = {}) {
    const thisConfig = Object.assign(
      {
        name: 'log-messages',
      },
      config
    );
    super(http, promise, thisConfig);
  }

  requestPayload(level, entries) {
    delete entries.level;
    return { level, entries };
  }
  debug(entries) {
    return this.create(this.requestPayload('debug', entries));
  }
  info(entries) {
    return this.create(this.requestPayload('info', entries));
  }
  warn(entries) {
    return this.create(this.requestPayload('warn', entries));
  }
  error(entries) {
    return this.create(this.requestPayload('error', entries));
  }
}
