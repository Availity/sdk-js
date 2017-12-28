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
    const params = Object.assign({}, { customerId }, config.params || {});
    return this.query(Object.assign({}, { params }, config));
  }
}
