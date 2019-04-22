import AvMicroservice from '../ms';

export default class AvLogMessages extends AvMicroservice {
  constructor({ http, promise, merge, config }) {
    const options = Object.assign(
      {
        path: '/ms/api/availity/internal/dma/log-message-service/portal',
        name: 'log-messages',
        version: '/v2',
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

  send(entries) {
    return this.create(entries);
  }
}
