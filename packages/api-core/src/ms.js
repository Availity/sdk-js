import AvApi from './api';
import API_OPTIONS from './options';

export default class AvMicroservice extends AvApi {
  constructor(http, promise, merge, config) {
    //eslint-disable-line
    super({
      http: http.http,
      promise: http.promise,
      merge: http.merge,
      config: http.config,
    });
    this.defaultConfig = this.merge({}, API_OPTIONS.MS, http.config);
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
