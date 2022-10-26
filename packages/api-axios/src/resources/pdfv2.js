import AvMicroserviceApi from '../ms';

export default class AvPdfMicroserviceApi extends AvMicroserviceApi {
  constructor(config) {
    super({
      ...config,
      name: 'spc/pdf/',
    });
  }

  getUrl(config, id = '') {
    const { path, version, name, id: configId } = this.config(config);
    let parts = [path, version || '', name];

    if (id || configId) {
      parts = [path, version || '', name, id || configId];
    }

    return parts.join('/').replace(/\/+/g, '/');
  }
}

export const avPdfMicroserviceApi = new AvPdfMicroserviceApi();
