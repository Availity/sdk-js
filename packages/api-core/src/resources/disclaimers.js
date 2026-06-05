import AvApi from '../api';

export default class AvDisclaimers extends AvApi {
  constructor(config) {
    const options = {
      path: '/api/sdk/platform',
      name: '/disclaimers',

      ...config,
    };
    super(options);
  }

  getDisclaimers(id, config) {
    const queryConfig = this.addParams({ id }, config);
    return this.query(queryConfig);
  }
}
