
import {API_OPTIONS} from './defaultOptions';

import AvLocalStorage from '@availity/localstorage-core';

export class AvApi {
  constructor(http, promise, config) {
    if (!http || !config || !promise) {
      throw new Error('[http], [config] and [promise] must be defined');
    }
    this.http = http;
    this.Promise = promise;
    this.defaultConfig = Object.assign({}, API_OPTIONS, config);
  }

  // get the merged config
  config(config = {}) {
    return Object.assign({}, this.defaultConfig, config);
  }

  // set the cache paramaters
  cacheParams(config) {
    config.params = config.params || {};
    if (config.cacheBust) {
      config.params.cacheBust = this.getCacheBustVal(config.cacheBust, () => {
        return Date.now();
      });
    }
    if (config.pageBust) {
      config.params.pageBust = this.getCacheBustVal(config.pageBust, () => {
        return this.getPageBust();
      });
    }
    if (config.sessionBust) {
      config.params.sessionBust = this.getCacheBustVal(config.sessionBust, () => {
        return AvLocalStorage.getSessionBust() || this.getPageBust();
      });
    }
  }

  // get the cache value with default function
  getCacheBustVal(cacheBust, defaultFn) {
    if (!cacheBust) {
      return;
    }
    if (typeof cacheBust === 'boolean' && defaultFn) {
      return defaultFn();
    }
    if (typeof cacheBust === 'function') {
      return cacheBust();
    }
    return cacheBust;
  }

  // get pagebust value, make sure it is instantiated first
  getPageBust() {
    if (typeof this.pageBustValue === 'undefined') {
      this.setPageBust();
    }
    return this.pageBustValue;
  }

  // set the page bust value to given value or timestamp
  setPageBust(value) {
    this.pageBustValue = typeof value === 'undefined' ? Date.now() : value;
  }

  // get final url from config
  getUrl(config, id = '') {
    if (!config.api) {
      return config.url;
    }
    const { path, version, name, url } = config;
    let parts = [];
    if (name) {
      parts = ['', path, version, name, id];
    } else {
      parts = [url, id];
    }
    // join parts, remove multiple /'s and trailing /
    return parts.join('/').replace(/[\/]+/g, '/').replace(/\/$/, '');
  }

  // return location if should poll otherwise false
  getLocation(response) {
    let location = false;
    const toPoll = response.config.polling
      && response.status === 202
      && response.config.attempt < response.config.pollingIntervals.length;
    if (toPoll) {
      if (response.config.getHeader) {
        location = response.config.getHeader(response, 'Location');
      } else {
        location = response.headers.Location;
      }
    }
    return location;
  }

  // handle response with possible polling
  onResponse(response, afterResponse) {
    const location = this.getLocation(response);
    if (location) {
      const newConfig = this.config(response.config);
      newConfig.method = 'GET';
      newConfig.url = location;
      newConfig.cache = false;
      return new this.Promise(resolve => {
        setTimeout(resolve, newConfig.pollingIntervals[newConfig.attempt] || 1000);
      })
      .then(() => {
        return this.makeRequest(newConfig, afterResponse);
      });
    }
    return afterResponse ? afterResponse(response) : response;
  }

  // make request to http
  makeRequest(config, afterResponse) {
    if (config.polling) {
      config.attempt = config.attempt || -1;
      config.attempt++;
    }
    return this.http(config)
    .then((response) => {
      return this.onResponse(response, afterResponse);
    })
    .catch((error) => {
      let response;
      if (error.response) {
        response = error.response;
      }
      return afterResponse ? afterResponse(response) : response;
    });
  }

  // post request
  create(data, config){
    if (!data) {
      throw new Error('called method without [data]');
    }
    config = this.config(config);
    config.method = 'POST';
    config.url = this.getUrl(config);
    config.data = data;
    if (this.beforeCreate) {
      config.data = this.beforeCreate(config.data);
    }
    return this.makeRequest(config, this.afterCreate);
  }

  // post request with method-override to get
  postGet(data, config){
    if (!data) {
      throw new Error('called method without [data]');
    }
    config = this.config(config);
    config.method = 'POST';
    config.headers = config.headers || {};
    config.headers['X-HTTP-Method-Override'] = 'GET';
    config.url = this.getUrl(config);
    config.data = data;
    if (this.beforePostGet) {
      config.data = this.beforePostGet(config.data);
    }
    return this.makeRequest(config, this.afterPostGet);
  }

  // get request with id
  get(id, config){
    if (!id) {
      throw new Error('called method without [id]');
    }
    config = this.config(config);
    config.method = 'GET';
    config.url = this.getUrl(config, id);
    this.cacheParams(config);
    return this.makeRequest(config, this.afterGet);
  }

  // get request with just params
  query(config){
    config = this.config(config);
    config.method = 'GET';
    config.url = this.getUrl(config);
    this.cacheParams(config);
    return this.makeRequest(config, this.afterQuery);
  }

  // put request
  update(id, data, config){
    if (typeof id !== 'string' && typeof id !== 'number') {
      config = data;
      data = id;
      id = '';
    }
    config = this.config(config);
    config.method = 'PUT';
    config.url = this.getUrl(config, id);
    config.data = data;
    if (this.beforeUpdate) {
      config.data = this.beforeUpdate(config.data);
    }
    return this.makeRequest(config, this.afterUpdate);
  }

  // delete request
  remove(id, config){
    let data;
    if (typeof id !== 'string' && typeof id !== 'number') {
      data = id;
      id = '';
    }
    config = this.config(config);
    config.method = 'DELETE';
    config.url = this.getUrl(config, id);
    config.data = data;
    if (this.beforeRemove) {
      config.data = this.beforeRemove(config.data);
    }
    return this.makeRequest(config, this.afterRemove);
  }
}
