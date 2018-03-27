'use strict';

const QuickLRU = require('quick-lru');

class KeyvLocalSync {
  constructor(opts) {
    this.opts = Object.assign(
      {
        namespace: 'keyv-local-sync',
        maxSize: 1000,
      },
      opts
    );

    if (!this.opts.store) {
      this.opts.store = new QuickLRU({ maxSize: this.opts.maxSize });
    }
  }

  getKeyPrefix(key) {
    return `${this.opts.namespace}:${key}`;
  }

  get(key) {
    key = this.getKeyPrefix(key);
    const data = this.opts.store.get(key);
    if (data === undefined) {
      return undefined;
    }
    if (typeof data.expires === 'number' && Date.now() > data.expires) {
      this.delete(key);
      return undefined;
    }
    return data.value;
  }

  set(key, value, ttl) {
    if (typeof ttl === 'undefined') {
      ({ ttl } = this.opts);
    }
    if (ttl === 0) {
      ttl = undefined;
    }
    const expires = typeof ttl === 'number' ? Date.now() + ttl : null;
    this.opts.store.set(this.getKeyPrefix(key), { value, expires }, ttl);
    return true;
  }

  delete(key) {
    return this.opts.store.delete(this.getKeyPrefix(key));
  }

  clear() {
    return this.opts.store.clear();
  }
}

module.exports = KeyvLocalSync;
