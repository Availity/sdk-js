import AvApi from '../api';

export default class AvProxy extends AvApi {
  constructor({ http, promise, merge, config }) {
    if (!config || !config.tenant) {
      throw new Error('Must specify tenant name for Proxy');
    }
    const options = Object.assign(
      {
        path: `api/v1/proxy/${config.tenant}`,
        version: '',
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
