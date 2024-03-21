import merge from 'lodash/merge';

import AvApi from './api';
import API_OPTIONS from './options';

export default class AvMicroserviceApi extends AvApi {
  constructor(config) {
    super(config);
    const { http, ...options } = config;
    this.defaultConfig = merge({}, API_OPTIONS.MS, options);
  }

  // Override aries 1 url concatenation
  getUrl(config, id = '') {
    const { path, version, name, id: configId } = this.config(config);
    let parts = [path, version || '', name];

    if (id || configId) {
      parts = [path, version || '', name, id || configId];
    }

    return parts.join('/').replace(/\/+/g, '/').replace(/\/$/, '');
  }
}
