/* global jest, describe, beforeEach, test, expect */

import AvLocalStorage from './index';

let storageVal = {};

const mockLocalStorage = {
  get length() {
    return Object.keys(storageVal).length;
  }
};

describe('AvLocalStorage', () => {

  beforeEach(() => {
    storageVal = {};

    mockLocalStorage.clear = jest.fn(() => {
      storageVal = {};
    });
    mockLocalStorage.getItem = jest.fn(key => {
      return storageVal[key] || null;
    });
    mockLocalStorage.setItem = jest.fn((key, value) => {
      storageVal[key] = value.toString();
    });
    mockLocalStorage.removeItem = jest.fn(key => {
      delete storageVal[key];
    });
    mockLocalStorage.key = jest.fn(i => {
      if (i < 0) { return null }
      const keys = Object.keys(storageVal);
      return i < keys.length ? keys[i] : null;
    });

    window.localStorage = mockLocalStorage;

    delete AvLocalStorage.hasSupport;
  });

  test('local storage should be defined', () => {
    expect(AvLocalStorage).toBeDefined();
  });

  test('supportsLocalStorage should return true with working local storage (mocked here)', () => {
    expect(AvLocalStorage.hasSupport).not.toBeDefined();
    expect(AvLocalStorage.supportsLocalStorage()).toBeTruthy();
  });

  test('supportsLocalStorage should be false when window.localStorage is undefined', () => {
    window.localStorage = undefined;
    expect(window.localStorage).not.toBeDefined();
    expect(AvLocalStorage.hasSupport).not.toBeDefined();
    expect(AvLocalStorage.supportsLocalStorage()).toBeFalsy();
  });

  test('supportsLocalStorage should be false when window.localStorage throws an error', () => {
    mockLocalStorage.setItem.mockImplementationOnce(() => {
      throw Error('test error');
    });
    expect(AvLocalStorage.hasSupport).not.toBeDefined();
    expect(AvLocalStorage.supportsLocalStorage()).toBeFalsy();
  });

  test('supportsLocalStorage should save results and only run check once', () => {
    expect(AvLocalStorage.hasSupport).not.toBeDefined();

    expect(mockLocalStorage.setItem.mock.calls.length).toBe(0);
    expect(mockLocalStorage.getItem.mock.calls.length).toBe(0);
    expect(mockLocalStorage.removeItem.mock.calls.length).toBe(0);

    expect(AvLocalStorage.supportsLocalStorage()).toBeTruthy();

    expect(mockLocalStorage.setItem.mock.calls.length).toBe(1);
    expect(mockLocalStorage.getItem.mock.calls.length).toBe(1);
    expect(mockLocalStorage.removeItem.mock.calls.length).toBe(1);

    expect(AvLocalStorage.hasSupport).toBeTruthy();
    expect(AvLocalStorage.supportsLocalStorage()).toBeTruthy();

    expect(mockLocalStorage.setItem.mock.calls.length).toBe(1);
    expect(mockLocalStorage.getItem.mock.calls.length).toBe(1);
    expect(mockLocalStorage.removeItem.mock.calls.length).toBe(1);
  });

  describe('get', () => {
    test('should return localStorage value at key', () => {
      const testKey = 'testKey';
      const testVal = 'testVal';
      storageVal[testKey] = testVal;
      expect(AvLocalStorage.get(testKey)).toBe(testVal);
    });
    test('should parse JSON value in localStorage at key', () => {
      const testKey = 'testKey';
      const testVal = { message: 'testVal' };
      const stringified = JSON.stringify(testVal);
      storageVal[testKey] = stringified;
      expect(AvLocalStorage.get(testKey)).toEqual(testVal);
    });
  });

  describe('set', () => {
    test('should set the localStorage key to value', () => {
      const testKey = 'testKey';
      const testVal = 'testVal';
      AvLocalStorage.set(testKey, testVal);
      expect(storageVal[testKey]).toBe(testVal);
    });
    test('should JSON.stringify non-string values before setting', () => {
      const testKey = 'testKey';
      let testVal = { message: 'testVal' };
      AvLocalStorage.set(testKey, testVal);
      expect(storageVal[testKey]).toBe(JSON.stringify(testVal));

      storageVal = {};
      testVal = true;
      AvLocalStorage.set(testKey, testVal);
      expect(storageVal[testKey]).toBe(JSON.stringify(testVal));

      storageVal = {};
      testVal = 50;
      AvLocalStorage.set(testKey, testVal);
      expect(storageVal[testKey]).toBe(JSON.stringify(testVal));
    });
  });

  test('remove should remove localStorage key', () => {
    const testKey = 'testKey';
    storageVal[testKey] = testKey;
    AvLocalStorage.remove(testKey);
    expect(storageVal[testKey]).not.toBeDefined();
  });

  test('getKeys should return all keys that match the search string', () => {
    const testKey = 'test';
    const otherKey = 'other';
    const allKeys = [];
    const expectKeys = [];
    for (let i = 0; i < 5; i++ ) {
      const thisTestKey = testKey + i;
      const thisOtherKey = otherKey + i;
      allKeys.push(thisTestKey);
      allKeys.push(thisOtherKey);
      expectKeys.push(thisTestKey);
    }
    allKeys.forEach(key => {
      storageVal[key] = key;
    });
    expect(AvLocalStorage.getKeys(testKey)).toEqual(expectKeys);
  });

  test('getKeys should return all keys that match the search regex', () => {
    const testKey = 'test';
    const testRegex = /^test\d+$/;
    const otherKey = 'other';
    const allKeys = [];
    const expectKeys = [];
    for (let i = 0; i < 5; i++ ) {
      const thisTestKey = testKey + i;
      const thisOtherKey = otherKey + i;
      allKeys.push(thisTestKey);
      allKeys.push(thisOtherKey);
      expectKeys.push(thisTestKey);
    }
    allKeys.forEach(key => {
      storageVal[key] = key;
    });
    expect(AvLocalStorage.getKeys(testRegex)).toEqual(expectKeys);
  });

  test('getKeys should return all empty array with no localStorage support', () => {
    const testKey = 'test';
    const otherKey = 'other';
    const allKeys = [];
    const expectKeys = [];
    for (let i = 0; i < 5; i++ ) {
      const thisTestKey = testKey + i;
      const thisOtherKey = otherKey + i;
      allKeys.push(thisTestKey);
      allKeys.push(thisOtherKey);
      expectKeys.push(thisTestKey);
    }
    allKeys.forEach(key => {
      storageVal[key] = key;
    });
    AvLocalStorage.hasSupport = false;
    expect(AvLocalStorage.getKeys(testKey)).toEqual([]);
  });

  test('removeKeys should remove all keys that match search string', () => {
    const testKey = 'test';
    const otherKey = 'other';
    const allKey = 'Key';
    const startStorage = {};
    const expectStorage = {};
    for (let i = 0; i < 5; i++ ) {
      const thisTestKey = testKey + allKey + i;
      const thisOtherKey = otherKey + allKey + i;
      startStorage[thisTestKey] = thisTestKey;
      startStorage[thisOtherKey] = thisOtherKey;
      expectStorage[thisOtherKey] = thisOtherKey;
    }
    storageVal = startStorage;
    AvLocalStorage.removeKeys(testKey);
    expect(storageVal).toEqual(expectStorage);
    storageVal = startStorage;
    AvLocalStorage.removeKeys(allKey);
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
    for (let i = 0; i < 5; i++ ) {
      const thisTestKey = testKey + allKey + i;
      const thisOtherKey = otherKey + allKey + i;
      startStorage[thisTestKey] = thisTestKey;
      startStorage[thisOtherKey] = thisOtherKey;
      expectStorage[thisOtherKey] = thisOtherKey;
    }
    storageVal = startStorage;
    AvLocalStorage.removeKeys(testRegex);
    expect(storageVal).toEqual(expectStorage);
    storageVal = startStorage;
    AvLocalStorage.removeKeys(allRegex);
    expect(storageVal).toEqual({});
  });

  test('getSessionBust should return value at key \'avCacheBust\'', () => {
    const testKey = 'avCacheBust';
    const testVal = 'testVal';
    storageVal[testKey] = testVal;
    expect(AvLocalStorage.getSessionBust()).toBe(testVal);
  });
});
