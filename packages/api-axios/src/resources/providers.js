import AvApi from '../api';

export default class AvProvidersApi extends AvApi {
  constructor(config) {
    super({
      path: 'cloud/web/onb/roster-api/roster',
      name: 'providers',
      ...config,
    });
  }

  async getProviders(customerId, config) {
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

export const avProvidersApi = new AvProvidersApi();
