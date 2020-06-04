import AvApi from './api';
import API_OPTIONS from './options';
import resolveHost from './resolve-host';

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
    const { path, version, name, id: configId } = this.config(config);
    let parts = [path, version || '', name];
    if (id || configId) {
      parts = [path, version || '', name, id || configId];
    }
    const uri = parts
      .join('/')
      .replace(/[/]+/g, '/')
      .replace(/\/$/, '');

    const hostname = resolveHost(config.host, config.window || window);
    return (hostname ? `https://${hostname}` : '') + uri;
  }

  // polling location is the same url
  getLocation(response) {
    return this.getUrl(response.config);
  }
}
