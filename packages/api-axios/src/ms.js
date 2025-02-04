import merge from 'lodash/merge';

import AvApi from './api';
import API_OPTIONS from './options';

export default class AvMicroserviceApi extends AvApi {
  constructor(config) {
    super(config);
    const { http, ...options } = config;
    this.defaultConfig = merge({}, API_OPTIONS.MS, options);
  }

  getUrl(config, id = '') {
    const { path, version, name, id: configId, url } = this.config(config);

    const parts = url ? [url, path, version || '', name] : [path, version || '', name];

    if (id || configId) {
      parts.push(id || configId);
    }

    // Filter out empty strings and join with slashes
    const newUrl = parts.join('/');

    if (url) {
      // Clean up absolute URLs
      return newUrl.replaceAll(/([^:]\/)\/+/g, '$1'); // Remove multiple slashes but preserve https://
    }
    // Clean up relative URLs
    return newUrl
      .replaceAll(/\/+/g, '/') // Replace multiple slashes with single slash
      .replace(/^\/+/, '/') // Ensure single leading slash
      .replace(/\/+$/, ''); // Remove trailing slash
  }
}
