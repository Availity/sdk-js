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

  // make request to http
  request(config, afterResponse) {
    return this.http(config)
      .then(response => this.onResponse(response, afterResponse))
      .catch(error => {
        let response;
        if (error) {
          response = error;
          response.error = true;
        }
        return afterResponse ? afterResponse(response) : response;
      });
  }
}
