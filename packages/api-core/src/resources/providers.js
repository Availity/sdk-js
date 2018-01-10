import AvApi from '../api';

export default class AvProviders extends AvApi {
  constructor({ http, promise, merge, config }) {
    const options = Object.assign(
      {
        path: 'api/internal',
        name: 'providers',
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

  getProviders(customerId, config) {
    const queryConfig = this.addParams({ customerId }, config);
    return this.query(queryConfig);
  }

  static normalize(providers) {
    const cloned = providers.slice();

    cloned.forEach(provider => {
      provider.name = provider.businessName
        ? provider.businessName
        : `${provider.lastName}, ${provider.firstName}`;
    });

    return cloned;
  }
}
