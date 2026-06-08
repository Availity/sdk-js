import AvMicroservice from '../ms';

export default class AvPdfMicroservice extends AvMicroservice {
  constructor(config) {
    super({
      name: 'spc/pdf/',
      ...config,
    });
  }

  getUrl(config, id = '') {
    const { path, version, name, id: configId } = this.config(config);
    let parts = [path, version || '', name];

    if (id || configId) {
      parts = [path, version || '', name, id || configId];
    }

    return parts.join('/').replaceAll(/\/+/g, '/');
  }
}
