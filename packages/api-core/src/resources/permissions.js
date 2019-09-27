import AvApi from '../api';

export default class AvPermissions extends AvApi {
  constructor({ http, promise, merge, config }) {
    const options = {
      path: 'api/sdk/platform',
      name: 'permissions',
      ...config,
    };
    super({
      http,
      promise,
      merge,
      config: options,
    });
  }

  getPermissions(id, region) {
    return this.query({
      params: { id, region },
    });
  }
}
