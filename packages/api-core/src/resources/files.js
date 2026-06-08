import AvMicroservice from '../ms';

export default class AvFiles extends AvMicroservice {
  constructor(config) {
    const options = {
      name: 'core/vault/upload/v1',
      headers: {
        'Content-Type': undefined,
      },
      ...config,
    };
    super(options);
  }

  uploadFile(data, config) {
    if (!config.customerId || !config.clientId) {
      throw new Error('[config.customerId] and [config.clientId] must be defined');
    }
    config = this.config(config);
    config.headers['X-Availity-Customer-ID'] = config.customerId;
    config.headers['X-Client-ID'] = config.clientId;

    return this.create(data, config);
  }
}
