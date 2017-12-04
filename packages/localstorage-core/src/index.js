class AvLocalStorage {
  constructor() {
    this.hasSupport = undefined;
  }

  supportsLocalStorage() {
    // if hasSupport has not yet been defined, run support test
    if (typeof this.hasSupport === 'undefined') {
      let hasSupport = false;
      try {
        // check if localStorage is available
        const { localStorage } = window;
        if (localStorage) {
          // make sure that localStorage has expected behavior
          const uid = Date.now();
          localStorage.setItem(uid, uid);
          const testVal = localStorage.getItem(uid);
          hasSupport = testVal === uid.toString();
          localStorage.removeItem(uid);
        }
      } catch (e) {
        // if any errors found, support is false
        hasSupport = false;
      }
      this.hasSupport = hasSupport;
    }
    return this.hasSupport;
  }

  get(key) {
    // checks if localStorage is supported, then attempt to parse JSON keys
    if (this.supportsLocalStorage()) {
      const value = window.localStorage.getItem(key);
      let output;
      try {
        output = JSON.parse(value);
      } catch (e) {
        output = value;
      }
      return output;
    }

    return undefined;
  }

  set(key, value) {
    // checks if localStorage is supported, stringifies non-strings before setting value
    if (this.supportsLocalStorage()) {
      const setValue =
        typeof value === 'string' ? value : JSON.stringify(value);
      window.localStorage.setItem(key, setValue);
    }
  }

  remove(key) {
    // wrapper to remove Item
    if (this.supportsLocalStorage()) {
      window.localStorage.removeItem(key);
    }
  }

  getKeys(searchKey) {
    // get all keys that match this string or regex
    if (this.supportsLocalStorage()) {
      const regexString =
        searchKey instanceof RegExp ? searchKey : new RegExp(searchKey);
      if (regexString) {
        const output = [];
        const { length } = window.localStorage;
        for (let i = 0; i < length; i++) {
          const thisKey = window.localStorage.key(i);
          if (regexString.test(thisKey)) {
            output.push(thisKey);
          }
        }
        return output;
      }
    }
    return [];
  }

  removeKeys(searchKey) {
    // remove all keys that match this string or regex
    if (this.supportsLocalStorage()) {
      const removeKeys = this.getKeys(searchKey);
      removeKeys.forEach(key => {
        this.remove(key);
      });
    }
  }

  getSessionBust() {
    // return the avCacheBust value
    return this.get('avCacheBust');
  }
}

export default AvLocalStorage;
