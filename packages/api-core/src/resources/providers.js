import AvApi from '../resource';

export default class AvProviders extends AvApi {
  constructor(http, promise, config = {}) {
    const thisConfig = Object.assign(
      {
        path: 'api/internal',
        name: 'providers',
      },
      config
    );
    super(http, promise, thisConfig);
  }

  getProviders(customerId, config) {
    const params = Object.assign({}, { customerId }, config.params || {});
    return this.query(Object.assign({}, { params }, config));
  }
}
