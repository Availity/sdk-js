import AvApi from '../api';

export default class AvSettings extends AvApi {
  constructor({ http, promise, merge, config }) {
    const options = Object.assign(
      {
        path: 'api/utils',
        name: 'settings',
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
}
