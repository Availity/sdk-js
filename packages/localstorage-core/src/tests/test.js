import AvLocalStorage from '../';

let storageVal = {};
let avLocalStorage;

const mockLocalStorage = {
  get length() {
    return Object.keys(storageVal).length;
  },
};

describe('avLocalStorage', () => {
  beforeEach(() => {
    storageVal = {};

    avLocalStorage = new AvLocalStorage();

    mockLocalStorage.clear = jest.fn(() => {
      storageVal = {};
    });
    mockLocalStorage.getItem = jest.fn(key => storageVal[key] || null);
    mockLocalStorage.setItem = jest.fn((key, value) => {
      storageVal[key] = value.toString();
    });
    mockLocalStorage.removeItem = jest.fn(key => {
      delete storageVal[key];
    });
    mockLocalStorage.key = jest.fn(i => {
      if (i < 0) {
        return null;
      }
      const keys = Object.keys(storageVal);
      return i < keys.length ? keys[i] : null;
    });

    window.localStorage = mockLocalStorage;

    delete avLocalStorage.hasSupport;
  });

  test('local storage should be defined', () => {
    expect(avLocalStorage).toBeDefined();
  });

  test('supportsLocalStorage should return true with working local storage (mocked here)', () => {
    expect(avLocalStorage.hasSupport).not.toBeDefined();
    expect(avLocalStorage.supportsLocalStorage()).toBeTruthy();
  });

  test('supportsLocalStorage should be false when window.localStorage is undefined', () => {
    window.localStorage = undefined;
    expect(window.localStorage).not.toBeDefined();
    expect(avLocalStorage.hasSupport).not.toBeDefined();
    expect(avLocalStorage.supportsLocalStorage()).toBeFalsy();
  });

  test('supportsLocalStorage should be false when window.localStorage throws an error', () => {
    mockLocalStorage.setItem.mockImplementationOnce(() => {
      throw Error('test error');
    });
    expect(avLocalStorage.hasSupport).not.toBeDefined();
    expect(avLocalStorage.supportsLocalStorage()).toBeFalsy();
  });

  test('supportsLocalStorage should save results and only run check once', () => {
    expect(avLocalStorage.hasSupport).not.toBeDefined();

    expect(mockLocalStorage.setItem.mock.calls.length).toBe(0);
    expect(mockLocalStorage.getItem.mock.calls.length).toBe(0);
    expect(mockLocalStorage.removeItem.mock.calls.length).toBe(0);

    expect(avLocalStorage.supportsLocalStorage()).toBeTruthy();

    expect(mockLocalStorage.setItem.mock.calls.length).toBe(1);
    expect(mockLocalStorage.getItem.mock.calls.length).toBe(1);
    expect(mockLocalStorage.removeItem.mock.calls.length).toBe(1);

    expect(avLocalStorage.hasSupport).toBeTruthy();
    expect(avLocalStorage.supportsLocalStorage()).toBeTruthy();

    expect(mockLocalStorage.setItem.mock.calls.length).toBe(1);
    expect(mockLocalStorage.getItem.mock.calls.length).toBe(1);
    expect(mockLocalStorage.removeItem.mock.calls.length).toBe(1);
  });

  describe('get', () => {
    test('should return localStorage value at key', () => {
      const testKey = 'testKey';
      const testVal = 'testVal';
      storageVal[testKey] = testVal;
      expect(avLocalStorage.get(testKey)).toBe(testVal);
    });
    test('should parse JSON value in localStorage at key', () => {
      const testKey = 'testKey';
      const testVal = { message: 'testVal' };
      const stringified = JSON.stringify(testVal);
      storageVal[testKey] = stringified;
      expect(avLocalStorage.get(testKey)).toEqual(testVal);
    });
  });

  describe('set', () => {
    test('should set the localStorage key to value', () => {
      const testKey = 'testKey';
      const testVal = 'testVal';
      avLocalStorage.set(testKey, testVal);
      expect(storageVal[testKey]).toBe(testVal);
    });
    test('should JSON.stringify non-string values before setting', () => {
      const testKey = 'testKey';
      let testVal = { message: 'testVal' };
      avLocalStorage.set(testKey, testVal);
      expect(storageVal[testKey]).toBe(JSON.stringify(testVal));

      storageVal = {};
      testVal = true;
      avLocalStorage.set(testKey, testVal);
      expect(storageVal[testKey]).toBe(JSON.stringify(testVal));

      storageVal = {};
      testVal = 50;
      avLocalStorage.set(testKey, testVal);
      expect(storageVal[testKey]).toBe(JSON.stringify(testVal));
    });
  });

  test('remove should remove localStorage key', () => {
    const testKey = 'testKey';
    storageVal[testKey] = testKey;
    avLocalStorage.remove(testKey);
    expect(storageVal[testKey]).not.toBeDefined();
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
      storageVal[key] = key;
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
      storageVal[key] = key;
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
      storageVal[key] = key;
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
    storageVal = startStorage;
    avLocalStorage.removeKeys(testKey);
    expect(storageVal).toEqual(expectStorage);
    storageVal = startStorage;
    avLocalStorage.removeKeys(allKey);
    expect(storageVal).toEqual({});
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
    storageVal = startStorage;
    avLocalStorage.removeKeys(testRegex);
    expect(storageVal).toEqual(expectStorage);
    storageVal = startStorage;
    avLocalStorage.removeKeys(allRegex);
    expect(storageVal).toEqual({});
  });

  test("getSessionBust should return value at key 'avCacheBust'", () => {
    const testKey = 'avCacheBust';
    const testVal = 'testVal';
    storageVal[testKey] = testVal;
    expect(avLocalStorage.getSessionBust()).toBe(testVal);
  });
});
