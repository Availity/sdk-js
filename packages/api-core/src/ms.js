import AvApi from './api';
import API_OPTIONS from './options';
import deepMerge from './deepMerge';

export default class AvMicroservice extends AvApi {
  constructor(config) {
    super(config);
    const { http, ...options } = config;
    this.defaultConfig = deepMerge({}, API_OPTIONS.MS, options);
  }

  getUrl(config, id = '') {
    const { path, version, name, url, id: configId } = this.config(config);

    const parts = url ? [url, path, version || '', name] : [path, version || '', name];
    if (id || configId) {
      parts.push(id || configId);
    }

    const joined = parts.join('/');
    if (url) {
      return joined.replaceAll(/([^:]\/)\/+/g, '$1');
    }
    return joined.replaceAll(/\/+/g, '/').replace(/\/$/, '');
  }

  getLocation(response) {
    return this.getUrl(response.config);
  }
}
