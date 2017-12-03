import AvLocalStorage from '@availity/localstorage-core';

import API_OPTIONS from './options';

export default class AvApi {
  constructor(http, promise, config) {
    if (!http || !config || !promise) {
      throw new Error('[http], [config] and [promise] must be defined');
    }
    this.http = http;
    this.Promise = promise;
    this.defaultConfig = Object.assign({}, API_OPTIONS, config);
    this.localStorage = new AvLocalStorage();
  }

  // get the merged config
  config(config = {}) {
    return Object.assign({}, this.defaultConfig, config);
  }

  // set the cache paramaters
  cacheParams(config) {
    config.params = config.params || {};

    if (config.cacheBust) {
      config.params.cacheBust = this.getCacheBustVal(config.cacheBust, () =>
        Date.now()
      );
    }

    if (config.pageBust) {
      config.params.pageBust = this.getCacheBustVal(config.pageBust, () =>
        this.getPageBust()
      );
    }

    if (config.sessionBust) {
      config.params.sessionBust = this.getCacheBustVal(
        config.sessionBust,
        () => this.localStorage.getSessionBust() || this.getPageBust()
      );
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
    return parts
      .join('/')
      .replace(/[/]+/g, '/')
      .replace(/\/$/, '');
  }

  // return location if should poll otherwise false
  getLocation(response) {
    let location = false;

    const toPoll =
      response.config.polling &&
      response.status === 202 &&
      response.config.attempt < response.config.pollingIntervals.length;

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
        setTimeout(
          resolve,
          newConfig.pollingIntervals[newConfig.attempt] || 1000
        );
      }).then(() => this.request(newConfig, afterResponse));
    }

    return afterResponse ? afterResponse(response) : response;
  }

  // make request to http
  request(config, afterResponse) {
    if (config.polling) {
      config.attempt = config.attempt || -1;
      config.attempt += 1;
    }

    return this.http(config)
      .then(response => this.onResponse(response, afterResponse))
      .catch(error => {
        let response;
        if (error.response) {
          response = { error };
        }
        return afterResponse ? afterResponse(response) : response;
      });
  }

  // post request
  create(data, config) {
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

  post(data, config) {
    return this.create(data, config);
  }

  // post request with method-override to get
  postGet(data, config) {
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
    return this.request(config, this.afterPostGet);
  }

  // get request with id
  get(id, config) {
    if (!id) {
      throw new Error('called method without [id]');
    }
    config = this.config(config);
    config.method = 'GET';
    config.url = this.getUrl(config, id);
    this.cacheParams(config);
    return this.request(config, this.afterGet);
  }

  // get request with just params
  query(config) {
    config = this.config(config);
    config.method = 'GET';
    config.url = this.getUrl(config);
    this.cacheParams(config);
    return this.request(config, this.afterQuery);
  }

  // put request
  update(id, data, config) {
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

  put(id, data, config) {
    return this.update(id, data, config);
  }

  // delete request
  remove(id, config) {
    let data;
    if (typeof id !== 'string' && typeof id !== 'number') {
      data = id;
      id = '';
    }
    config = this.config(config);
    config.method = 'DELETE';
    config.url = this.getUrl(config, id);
    config.data = data;

    const beforeFunc = this.beforeRemove || this.beforeDelete;
    if (beforeFunc) {
      config.data = beforeFunc(config.data);
    }
    return this.request(config, this.afterRemove || this.afterDelete);
  }

  delete(id, config) {
    return this.remove(id, config);
  }
}
