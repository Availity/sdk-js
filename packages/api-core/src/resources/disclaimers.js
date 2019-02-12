import AvApi from '../api';

export default class AvDisclaimers extends AvApi {
  constructor({ http, promise, merge, config }) {
    const options = Object.assign(
      {
        path: '/api/sdk/platform',
        name: '/disclaimers',
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

  getDisclaimers(id, config) {
    const queryConfig = this.addParams({ id }, config);
    return this.query(queryConfig);
  }
}
