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

  getUrl(config) {
    const { path, name, id } = this.config(config);
    let parts = [path, name];
    if (id) {
      parts = [path, name, id];
    }
    return parts
      .join('/')
      .replace(/[/]+/g, '/')
      .replace(/\/$/, '');
  }
}
