import AvLocalStorage from '../';

let avLocalStorage;

const getAllItems = () => {
  const items = {};
  const keys = Object.keys(window.localStorage);
  let i = keys.length;

  while (i > 0) {
    i -= 1;
    items[keys[i]] = window.localStorage.getItem(keys[i]);
  }

  return items;
};

describe('avLocalStorage', () => {
  beforeEach(() => {
    avLocalStorage = new AvLocalStorage();
  });

  afterEach(() => {
    window.localStorage.clear();
  });

  test('local storage should be defined', () => {
    expect(avLocalStorage).toBeDefined();
  });

  test('supportsLocalStorage should return true with working local storage (mocked here)', () => {
    expect(avLocalStorage.hasSupport).not.toBeDefined();
    expect(avLocalStorage.supportsLocalStorage()).toBeTruthy();
  });

  describe('get', () => {
    test('should return localStorage value at key', () => {
      const testKey = 'testKey';
      const testVal = 'testVal';
      window.localStorage.setItem(testKey, testVal);
      expect(avLocalStorage.get(testKey)).toBe(testVal);
    });
    test('should parse JSON value in localStorage at key', () => {
      const testKey = 'testKey';
      const testVal = { message: 'testVal' };
      const stringified = JSON.stringify(testVal);
      window.localStorage.setItem(testKey, stringified);
      expect(avLocalStorage.get(testKey)).toEqual(testVal);
    });
  });

  describe('set', () => {
    test('should set the localStorage key to value', () => {
      const testKey = 'testKey';
      const testVal = 'testVal';
      avLocalStorage.set(testKey, testVal);
      expect(window.localStorage.getItem(testKey)).toBe(testVal);
    });
    test('should JSON.stringify non-string values before setting', () => {
      const testKey = 'testKey';
      let testVal = { message: 'testVal' };
      avLocalStorage.set(testKey, testVal);
      expect(window.localStorage.getItem(testKey)).toBe(
        JSON.stringify(testVal)
      );

      window.localStorage.clear();
      testVal = true;
      avLocalStorage.set(testKey, testVal);
      expect(window.localStorage.getItem(testKey)).toBe(
        JSON.stringify(testVal)
      );

      window.localStorage.clear();
      testVal = 50;
      avLocalStorage.set(testKey, testVal);
      expect(window.localStorage.getItem(testKey)).toBe(
        JSON.stringify(testVal)
      );
    });
  });

  test('remove should remove localStorage key', () => {
    const testKey = 'testKey';
    window.localStorage.setItem(testKey, testKey);
    avLocalStorage.remove(testKey);
    expect(window.localStorage.getItem(testKey)).toBeNull();
  });

  test('getKeys should return all keys that match the search string', () => {
    const testKey = 'test';
    const otherKey = 'other';
    const allKeys = [];
    const expectKeys = [];
    for (let i = 0; i < 5; i++) {
      const thisTestKey = testKey + i;
      const thisOtherKey = otherKey + i;
      allKeys.push(thisTestKey);
      allKeys.push(thisOtherKey);
      expectKeys.push(thisTestKey);
    }
    allKeys.forEach(key => {
      window.localStorage.setItem(key, key);
    });
    expect(avLocalStorage.getKeys(testKey)).toEqual(expectKeys);
  });

  test('getKeys should return all keys that match the search regex', () => {
    const testKey = 'test';
    const testRegex = /^test\d+$/;
    const otherKey = 'other';
    const allKeys = [];
    const expectKeys = [];
    for (let i = 0; i < 5; i++) {
      const thisTestKey = testKey + i;
      const thisOtherKey = otherKey + i;
      allKeys.push(thisTestKey);
      allKeys.push(thisOtherKey);
      expectKeys.push(thisTestKey);
    }
    allKeys.forEach(key => {
      window.localStorage.setItem(key, key);
    });
    expect(avLocalStorage.getKeys(testRegex)).toEqual(expectKeys);
  });

  test('getKeys should return all empty array with no localStorage support', () => {
    const testKey = 'test';
    const otherKey = 'other';
    const allKeys = [];
    const expectKeys = [];
    for (let i = 0; i < 5; i++) {
      const thisTestKey = testKey + i;
      const thisOtherKey = otherKey + i;
      allKeys.push(thisTestKey);
      allKeys.push(thisOtherKey);
      expectKeys.push(thisTestKey);
    }
    allKeys.forEach(key => {
      window.localStorage.setItem(key, key);
    });
    avLocalStorage.hasSupport = false;
    expect(avLocalStorage.getKeys(testKey)).toEqual([]);
  });

  test('removeKeys should remove all keys that match search string', () => {
    const testKey = 'test';
    const otherKey = 'other';
    const allKey = 'Key';
    const startStorage = {};
    const expectStorage = {};
    for (let i = 0; i < 5; i++) {
      const thisTestKey = testKey + allKey + i;
      const thisOtherKey = otherKey + allKey + i;
      startStorage[thisTestKey] = thisTestKey;
      startStorage[thisOtherKey] = thisOtherKey;
      expectStorage[thisOtherKey] = thisOtherKey;
    }
    Object.keys(startStorage).forEach(key => {
      window.localStorage.setItem(key, key);
    });
    avLocalStorage.removeKeys(testKey);
    expect(getAllItems()).toEqual(expectStorage);

    Object.keys(startStorage).forEach(key => {
      window.localStorage.setItem(key, key);
    });
    avLocalStorage.removeKeys(allKey);
    expect(getAllItems()).toEqual({});
  });

  test('removeKeys should remove all keys that match search regex', () => {
    const testKey = 'test';
    const otherKey = 'other';
    const allKey = 'Key';
    const testRegex = /^test/;
    const allRegex = /Key\d+$/;
    const startStorage = {};
    const expectStorage = {};
    for (let i = 0; i < 5; i++) {
      const thisTestKey = testKey + allKey + i;
      const thisOtherKey = otherKey + allKey + i;
      startStorage[thisTestKey] = thisTestKey;
      startStorage[thisOtherKey] = thisOtherKey;
      expectStorage[thisOtherKey] = thisOtherKey;
    }
    Object.keys(startStorage).forEach(key => {
      window.localStorage.setItem(key, key);
    });
    avLocalStorage.removeKeys(testRegex);
    expect(getAllItems()).toEqual(expectStorage);

    Object.keys(startStorage).forEach(key => {
      window.localStorage.setItem(key, key);
    });
    avLocalStorage.removeKeys(allRegex);
    expect(getAllItems()).toEqual({});
  });

  test("getSessionBust should return value at key 'avCacheBust'", () => {
    const testKey = 'avCacheBust';
    const testVal = 'testVal';
    window.localStorage.setItem(testKey, testVal);
    expect(avLocalStorage.getSessionBust()).toBe(testVal);
  });
});
