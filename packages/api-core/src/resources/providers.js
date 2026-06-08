import AvApi from '../api';

export default class AvProviders extends AvApi {
  constructor(config) {
    const options = {
      path: 'api/internal',
      name: 'providers',
      ...config,
    };
    super(options);
  }

  getProviders(customerId, config) {
    const queryConfig = this.addParams({ customerId }, config);
    return this.query(queryConfig);
  }

  normalize(providers) {
    const cloned = [...providers];

    for (const provider of cloned) {
      provider.name = provider.businessName || `${provider.lastName}, ${provider.firstName}`;
    }

    return cloned;
  }
}
