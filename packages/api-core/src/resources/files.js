import AvMicroservice from '../ms';

export default class AvFiles extends AvMicroservice {
  constructor({ http, promise, merge, config }) {
    const options = Object.assign(
      {
        name: 'core/vault/upload/v1',
        headers: {
          'Content-Type': undefined,
          'X-App-Context': 'ecs-qa-app-context',
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
    config = this.config(config);
    config.headers['X-Availity-Customer-ID'] = config.customerId;
    return this.create(data, config);
  }
}
