import AvApi from '../api';

export default class AvLogMessages extends AvApi {
  constructor({ http, promise, merge, config }) {
    const options = Object.assign(
      {
        name: 'log-messages',
      },
      config
    );
    super({
      http,
      promise,
      merge,
      config: options,
    });
  }

  send(level, entries) {
    delete entries.level;
    return { level, entries };
  }

  debug(entries) {
    return this.create(this.send('debug', entries));
  }

  info(entries) {
    return this.create(this.send('info', entries));
  }

  warn(entries) {
    return this.create(this.send('warn', entries));
  }

  error(entries) {
    return this.create(this.send('error', entries));
  }
}
