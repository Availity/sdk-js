import AvApi from '../api';

export default class AvUsers extends AvApi {
  constructor({ http, promise, merge, config }) {
    const options = {
      path: 'api/sdk/platform',
      name: 'users',
      ...config,
    };
    super({
      http,
      promise,
      merge,
      config: options,
    });
  }

  me(config) {
    return this.get('me', config).then(response => response.data);
  }
}
