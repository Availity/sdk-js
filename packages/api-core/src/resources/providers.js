import AvApi from '../api';

export default class AvProviders extends AvApi {
  constructor(http, promise, merge, config = {}) {
    const options = Object.assign(
      {
        path: 'api/internal',
        name: 'providers',
      },
      config
    );
    super(http, promise, merge, options);
  }

  getProviders(customerId, config) {
    const queryConfig = this.addParams({ customerId }, config);
    return this.query(queryConfig);
  }
}
