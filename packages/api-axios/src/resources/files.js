import AvMicroserviceApi from '../ms';

export default class AvFilesApi extends AvMicroserviceApi {
  constructor(config) {
    super({
      name: 'core/vault/upload/v1',
      headers: {
        'Content-Type': undefined,
      },
      ...config,
    });
  }

  async uploadFile(data, config) {
    if (!config.customerId || !config.clientId) {
      throw new Error('[config.customerId] and [config.clientId] must be defined');
    }

    config = this.config(config);
    config.headers['X-Availity-Customer-ID'] = config.customerId;
    config.headers['X-Client-ID'] = config.clientId;

    return this.create(data, config);
  }
}

export const avFilesApi = new AvFilesApi();
