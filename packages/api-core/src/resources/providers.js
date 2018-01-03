import AvApi from '../api';

export default class AvProviders extends AvApi {
  constructor(http, promise, config = {}) {
    const options = Object.assign(
      {
        path: 'api/internal',
        name: 'providers',
      },
      config
    );
    super(http, promise, options);
  }

  getProviders(customerId, config = {}) {
    let queryConfig = {
      params: {
        customerId,
      },
    };

    queryConfig = Object.assign({}, queryConfig, config);
    return this.query(queryConfig);
  }
}
