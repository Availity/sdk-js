import AvMicroservice from '../ms';

export default class AvFiles extends AvMicroservice {
  constructor({ http, promise, merge, config }) {
    const options = Object.assign(
      {
        name: 'core/vault/upload/v1',
        headers: {
          'Content-Type': undefined,
        },
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

  uploadFile(data, config) {
    if (!config.customerId || !config.clientId) {
      throw new Error(
        '[config.customerId] and [config.clientId] must be defined'
      );
    }
    config = this.config(config);
    config.headers['X-Availity-Customer-ID'] = config.customerId;
    config.headers['X-Client-ID'] = config.clientId;

    return this.create(data, config);
  }
}
