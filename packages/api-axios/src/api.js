import qs from 'qs';
import resolveUrl from '@availity/resolve-url';
import axios from 'axios';
import merge from 'lodash/merge';

import API_OPTIONS from './options';

export default class AvApi {
  constructor(config) {
    if (!config) {
      throw new Error('[config] must be defined');
    }

    // Allow for overriding axios client
    const { http, ...options } = config;
    this.http = http || axios;

    // Set default config
    this.defaultConfig = merge({}, API_OPTIONS.API, options);
  }

  // Get the merged config
  config(config = {}) {
    return merge({}, this.defaultConfig, config);
  }

  addParams(params = {}, config = {}, newObj = true) {
    const output = newObj ? { params: {}, ...config } : config;

    if (!newObj) {
      output.params = output.params || {};
    }

    output.params = { ...output.params, ...params };
    return output;
  }

  // Set the cache parameters
  cacheParams(config) {
    const params = {};

    if (config.cacheBust) {
      params.cacheBust = this.getCacheBustVal(config.cacheBust, () => Date.now());
    }

    if (config.pageBust) {
      params.pageBust = this.getCacheBustVal(config.pageBust, () => this.getPageBust());
    }

    if (config.sessionBust) {
      params.sessionBust = this.getCacheBustVal(config.sessionBust, () => this.getSessionBust() || this.getPageBust());
    }

    return this.addParams(params, config, false);
  }

  getSessionBust() {
    return window.localStorage.getItem('avCacheBust');
  }

  // Get the cache value with default function
  getCacheBustVal(cacheBust, defaultFn) {
    if (!cacheBust) {
      return undefined;
    }

    if (typeof cacheBust === 'boolean' && defaultFn) {
      return defaultFn();
    }

    if (typeof cacheBust === 'function') {
      return cacheBust();
    }

    return cacheBust;
  }

  // Get pagebust value, make sure it is instantiated first
  getPageBust() {
    if (this.pageBustValue === undefined) {
      this.setPageBust();
    }

    return this.pageBustValue;
  }

  // Set the page bust value to given value or timestamp
  setPageBust(value) {
    this.pageBustValue = value === undefined ? Date.now() : value;
  }

  // Get final url from config
  getUrl(config, id = '') {
    if (!config.api) {
      return config.url;
    }

    const { path, version, name, url } = config;

    let parts = [];
    parts = name ? ['', path, version, name, id] : [url, id];

    // join parts, remove multiple /'s and trailing /
    return parts.join('/').replaceAll(/\/+/g, '/').replace(/\/$/, '');
  }

  getRequestUrl() {
    return this.getUrl(this.config());
  }

  // Return location if should poll otherwise false
  getLocation(response) {
    const { config, headers = {} } = response;
    const { getHeader, base } = config;
    const { location, Location } = headers;

    const locationUrl = getHeader ? getHeader(response, 'Location') : location || Location;

    return resolveUrl({ relative: locationUrl, base });
  }

  // Condition for calls that should continue polling
  shouldPoll(response) {
    if (!response?.config) return false;
    const { attempt = 0, polling, pollingIntervals = [] } = response.config;
    return polling && response.status === 202 && attempt < pollingIntervals.length;
  }

  getQueryResultKey(data) {
    return Object.keys(data).find((key) => Array.isArray(data[key]));
  }

  getResult(data) {
    return data[this.getQueryResultKey(data)];
  }

  // Make request with axios
  async request(config, afterResponse) {
    if (config.polling) {
      config.attempt = config.attempt || 0;
      config.attempt += 1;
    }

    const response = await this.http(config);

    return this.onResponse(response, afterResponse);
  }

  // Handle response with possible polling
  async onResponse(response, afterResponse) {
    if (this.shouldPoll(response)) {
      const newConfig = this.config(response.config);
      const pollingUrl = this.getLocation(response);

      if (pollingUrl) {
        newConfig.method = newConfig.pollingMethod;
        newConfig.url = pollingUrl;
        newConfig.cache = false;

        await new Promise((resolve) => {
          setTimeout(resolve, newConfig.pollingIntervals[newConfig.attempt] || 1000);
        });

        return this.request(newConfig, afterResponse);
      }
    }

    return afterResponse ? afterResponse(response) : response;
  }

  // Send request with browser's navigator.sendBeacon
  async sendBeacon(data, config) {
    if (!data) {
      throw new Error('called method without [data]');
    }

    config = this.config(config);
    config.method = 'POST';
    config.url = this.getUrl(config);
    config.data = data;

    const beforeFunc = this.beforeCreate || this.beforePost;
    if (beforeFunc) {
      config.data = beforeFunc(config.data);
    }

    if (navigator.sendBeacon) {
      const result = navigator.sendBeacon(
        config.url,
        new Blob([config.data], {
          type: 'application/x-www-form-urlencoded',
        })
      );
      // A truthy return value from navigator.sendBeacon means the browser successfully queued the request
      // eslint-disable-next-line unicorn/no-useless-promise-resolve-reject
      if (result) return Promise.resolve();
    }

    // Fall back to XHR if browser does not support navigator.sendBeacon or browser fails to queue the request
    return this.request(config, this.afterCreate || this.afterPost);
  }

  // create
  async create(data, config) {
    if (!data) {
      throw new Error('called method without [data]');
    }

    config = this.config(config);
    config.method = 'POST';
    config.url = this.getUrl(config);
    config.data = data;

    const beforeFunc = this.beforeCreate || this.beforePost;
    if (beforeFunc) {
      config.data = beforeFunc(config.data);
    }

    return this.request(config, this.afterCreate || this.afterPost);
  }

  async post(data, config) {
    return this.create(data, config);
  }

  // post request with method-override to get
  async postGet(data, config) {
    if (!data) {
      throw new Error('called method without [data]');
    }

    config = this.config(config);
    config.method = 'POST';
    config.headers = config.headers || {};
    config.headers['X-HTTP-Method-Override'] = 'GET';
    config.headers['Content-Type'] = config.headers['Content-Type'] || 'application/x-www-form-urlencoded';
    config.url = this.getUrl(config);
    config.data = data;

    if (this.beforePostGet) {
      config.data = this.beforePostGet(config.data);
    }

    if (typeof config.data !== 'string' && config.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
      config.data = qs.stringify(config.data, {
        encode: false,
        arrayFormat: 'repeat',
        indices: false,
        allowDots: true,
      });
    }

    return this.request(config, this.afterPostGet);
  }

  // read
  async get(id, config) {
    if (!id) {
      throw new Error('called method without [id]');
    }

    config = this.config(config);
    config.method = 'GET';
    config.url = this.getUrl(config, id);
    config = this.cacheParams(config);

    return this.request(config, this.afterGet);
  }

  // get request with params
  async query(config) {
    config = this.config(config);
    config.method = 'GET';
    config.url = this.getUrl(config);
    config = this.cacheParams(config);

    return this.request(config, this.afterQuery);
  }

  async getPage(page = 1, config = {}, limit) {
    limit = limit || config.params?.limit || 50;
    const offset = (page - 1) * limit;
    return this.query(this.addParams({ offset, limit }, config, false));
  }

  async all(config) {
    const response = await this.query(config);

    const key = this.getQueryResultKey(response.data);
    const length = response.data?.length;
    const limit = response.data.limit || length <= response.data.totalCount ? length || 1 : 1;
    const totalPages = Math.ceil(response.data.totalCount / limit);
    const result = response.data[key] || [];

    if (totalPages > 1) {
      const otherPages = [];
      for (let i = 0; i < totalPages - 1; i += 1) {
        otherPages[i] = i + 2;
      }

      const pages = await Promise.all(
        otherPages.map(async (page) => {
          const resp = await this.getPage(page, config, limit);
          return resp.data[key] || [];
        })
      );

      return [...result, ...pages].flat();
    }

    return result;
  }

  // update
  async update(id, data, config) {
    if (typeof id !== 'string' && typeof id !== 'number') {
      config = data;
      data = id;
      id = '';
    }

    config = this.config(config);
    config.method = 'PUT';
    config.url = this.getUrl(config, id);
    config.data = data;

    const beforeFunc = this.beforeUpdate || this.beforePut;
    if (beforeFunc) {
      config.data = beforeFunc(config.data);
    }

    return this.request(config, this.afterUpdate || this.afterPut);
  }

  async put(...args) {
    return this.update(...args);
  }

  async patch(id, data, config) {
    if (typeof id !== 'string' && typeof id !== 'number') {
      config = data;
      data = id;
      id = '';
    }

    config = this.config(config);
    config.method = 'PATCH';
    config.url = this.getUrl(config, id);
    config.data = data;

    const beforeFunc = this.beforePatch;
    if (beforeFunc) {
      config.data = beforeFunc(config.data);
    }

    return this.request(config, this.afterPatch);
  }

  // delete
  async remove(id, config) {
    if (typeof id !== 'string' && typeof id !== 'number') {
      config = id;
      id = '';
    }

    config = this.config(config);
    config.method = 'DELETE';
    config.url = this.getUrl(config, id);

    const beforeFunc = this.beforeRemove || this.beforeDelete;
    if (beforeFunc) {
      config = beforeFunc(config);
    }

    return this.request(config, this.afterRemove || this.afterDelete);
  }

  async delete(...args) {
    return this.remove(...args);
  }
}
