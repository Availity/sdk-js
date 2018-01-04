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

  getProviders(customerId, config) {
    const queryConfig = Object.assign({ params: {} }, config);
    queryConfig.params = Object.assign({ customerId }, queryConfig.params);

    return this.query(queryConfig);
  }
}
