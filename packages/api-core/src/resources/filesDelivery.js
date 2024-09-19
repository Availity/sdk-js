import AvMicroservice from '../ms';

export default class AvFilesDelivery extends AvMicroservice {
  constructor({ http, promise, merge, config }) {
    const options = {
      name: 'platform/file-upload-delivery/v1/batch/deliveries',
      headers: {
        'Content-Type': 'application/json',
      },
      polling: true,
      pollingMethod: 'GET',
      ...config,
    };
    super({
      http,
      promise,
      merge,
      config: options,
    });
  }

  uploadFilesDelivery(data, config) {
    if (!config.customerId || !config.clientId) {
      throw new Error(
        '[config.customerId] and [config.clientId] must be defined'
      );
    }
    config = this.config(config);
    config.headers['X-Availity-Customer-ID'] = config.customerId;
    config.headers['X-Client-ID'] = config.clientId;

    return this.create(data || {}, config);
  }

  getLocation(response) {
    const baseUrl = super.getLocation(response);
    const { id } = response.data;
    return !id || baseUrl.endsWith(id) ? `${baseUrl}` : `${baseUrl}/${id}`;
  }
}
