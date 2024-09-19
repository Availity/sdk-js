import AvMicroserviceApi from '../ms';

export default class AvFilesDeliveryApi extends AvMicroserviceApi {
  constructor(config) {
    super({
      name: 'platform/file-upload-delivery/v1/batch/deliveries',
      headers: {
        'Content-Type': 'application/json',
      },
      polling: true,
      pollingMethod: 'GET',
      ...config,
    });
  }

  async uploadFilesDelivery(data, config) {
    if (!config.customerId || !config.clientId) {
      throw new Error('[config.customerId] and [config.clientId] must be defined');
    }
    config = this.config(config);
    config.headers['X-Availity-Customer-ID'] = config.customerId;
    config.headers['X-Client-ID'] = config.clientId;

    return this.create(data || {}, config);
  }

  getLocation(response) {
    const baseUrl = super.getLocation(response);
    const id = response.data.id;
    return !id || baseUrl.endsWith(id) ? `${baseUrl}` : `${baseUrl}/${id}`;
  }
}

export const avFilesDeliveryApi = new AvFilesDeliveryApi();
