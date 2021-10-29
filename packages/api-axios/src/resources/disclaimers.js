import AvApi from '../api';

export default class AvDisclaimersApi extends AvApi {
  constructor(config) {
    super({
      path: '/api/sdk/platform',
      name: '/disclaimers',
      ...config,
    });
  }

  async getDisclaimers(id, config) {
    const queryConfig = this.addParams({ id }, config);
    return this.query(queryConfig);
  }
}

export const avDisclaimersApi = new AvDisclaimersApi();
