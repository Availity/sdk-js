import AvApi from './api';
import API_OPTIONS from './options';

export default class AvMicroservice extends AvApi {
  constructor({ http, promise, merge, config }) {
    super({
      http,
      promise,
      merge,
      config,
    });
    this.defaultConfig = this.merge({}, API_OPTIONS.MS, config);
  }

  // override aries 1 url concatenation
  getUrl(config, id = '') {
    const { path, name, id: configId } = this.config(config);
    let parts = [path, name];
    if (id || configId) {
      parts = [path, name, id || configId];
    }
    return parts
      .join('/')
      .replace(/[/]+/g, '/')
      .replace(/\/$/, '');
  }

  // polling location is the same url
  getLocation(response) {
    return this.getUrl(response.config);
  }
}
