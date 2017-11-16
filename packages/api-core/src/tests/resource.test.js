/* global jest, describe, beforeEach, test, expect */

import { AvApi } from '../index';
import AvLocalStorage from '@availity/localstorage-core';
import { API_OPTIONS } from '../defaultOptions';

jest.useFakeTimers();

const mockHttp = jest.fn(() => {
  return Promise.resolve({});
});

describe('AvApi', () => {
  let TestAvApi;

  test('AvApi should be defined', () => {
    TestAvApi = new AvApi(mockHttp, {}, Promise);
    expect(TestAvApi).toBeDefined();
  });

  test('AvApi should throw errors when missing paramaters', () => {
    expect(() => {
      TestAvApi = new AvApi();
    }).toThrowError('[http], [config] and [promise] must be defined');
    expect(() => {
      TestAvApi = new AvApi(false, false, false);
    }).toThrowError('[http], [config] and [promise] must be defined');
    expect(() => {
      TestAvApi = new AvApi(false, Promise, {});
    }).toThrowError('[http], [config] and [promise] must be defined');
    expect(() => {
      TestAvApi = new AvApi(mockHttp, Promise, false);
    }).toThrowError('[http], [config] and [promise] must be defined');
    expect(() => {
      TestAvApi = new AvApi(mockHttp, false, Promise);
    }).toThrowError('[http], [config] and [promise] must be defined');
    expect(() => {
      TestAvApi = new AvApi(false, Promise, false);
    }).toThrowError('[http], [config] and [promise] must be defined');
    expect(() => {
      TestAvApi = new AvApi(mockHttp, false, false);
    }).toThrowError('[http], [config] and [promise] must be defined');
    expect(() => {
      TestAvApi = new AvApi(false, false, {});
    }).toThrowError('[http], [config] and [promise] must be defined');
  });

  test('AvApi.defaultConfig should merge the default options with passed in config', () => {
    TestAvApi = new AvApi(mockHttp, Promise, {});
    expect(TestAvApi.defaultConfig).toEqual(API_OPTIONS);

    const testConfig = { name: 'testName' };
    const testExpect = Object.assign({}, API_OPTIONS, testConfig);
    TestAvApi = new AvApi(mockHttp, Promise, testConfig);
    expect(TestAvApi.defaultConfig).toEqual(testExpect);
  });

  test('config() should merge passed in config with defaultConfig', () => {
    const mockConfig = {
      name: 'testName',
    };
    TestAvApi = new AvApi(mockHttp, Promise, mockConfig);
    const testConfig = { path: '/api/internal' };
    const testExpectConfig = Object.assign(
      {},
      TestAvApi.defaultConfig,
      testConfig
    );
    expect(TestAvApi.config(testConfig)).toEqual(testExpectConfig);
  });

  describe('getCacheBustVal', () => {
    beforeEach(() => {
      TestAvApi = new AvApi(mockHttp, Promise, {});
    });

    test('should return undefined with cache value is falsy', () => {
      const testCache = false;
      expect(TestAvApi.getCacheBustVal(testCache)).toBeUndefined();
    });

    test('should return passed in value when not boolean or function', () => {
      const testCache = 'test';
      expect(TestAvApi.getCacheBustVal(testCache)).toBe(testCache);
    });

    test('should return passed in value when true without default function', () => {
      const testCache = true;
      expect(TestAvApi.getCacheBustVal(testCache)).toBe(testCache);
    });

    test('should call and return default function when passed in value true', () => {
      const testCache = true;
      const testResponse = 'test';
      const defaultFn = jest.fn(() => {
        return testResponse;
      });
      expect(TestAvApi.getCacheBustVal(testCache, defaultFn)).toBe(
        testResponse
      );
      expect(defaultFn).toBeCalled();
    });

    test('should call and return passed in function', () => {
      const testResponse = 'test';
      const testCache = jest.fn(() => {
        return testResponse;
      });
      const defaultFn = jest.fn(() => {
        return testResponse + '2';
      });
      expect(TestAvApi.getCacheBustVal(testCache, defaultFn)).toBe(
        testResponse
      );
      expect(testCache).toBeCalled();
      expect(defaultFn).not.toBeCalled();
    });
  });

  test('setPageBust should set to passed in value', () => {
    TestAvApi = new AvApi(mockHttp, Promise, {});
    const test = 'test';
    TestAvApi.setPageBust(test);
    expect(TestAvApi.pageBustValue).toBe(test);
  });

  test('setPageBust should set to Date.now() when no passed in value', () => {
    TestAvApi = new AvApi(mockHttp, Promise, {});
    const test = 'test';
    Date.now = jest.fn(() => {
      return test;
    });
    TestAvApi.setPageBust();
    expect(TestAvApi.pageBustValue).toBe(test);
    expect(Date.now).toBeCalled();
  });

  test('getPageBust should return pageBustValue if set', () => {
    TestAvApi = new AvApi(mockHttp, Promise, {});
    const test = 'test';
    TestAvApi.pageBustValue = test;
    expect(TestAvApi.getPageBust()).toBe(test);
  });

  test('getPageBust should set pageBustValue if not set yet', () => {
    TestAvApi = new AvApi(mockHttp, Promise, {});
    const test = 'test';
    TestAvApi.setPageBust = jest.fn(() => {
      TestAvApi.pageBustValue = test;
    });
    expect(TestAvApi.getPageBust()).toBe(test);
    expect(TestAvApi.setPageBust).toBeCalled();
  });

  describe('cacheParams', () => {
    beforeEach(() => {
      TestAvApi = new AvApi(mockHttp, Promise, {});
    });

    test('should make sure params object exists', () => {
      const testConfig = {};
      TestAvApi.cacheParams(testConfig);
      expect(testConfig.params).toBeDefined();
    });

    test('should set cacheBust if cacheBust in config', () => {
      const testBust = 'test';
      const testConfig = {
        cacheBust: testBust,
      };
      TestAvApi.cacheParams(testConfig);
      expect(testConfig.params.cacheBust).toBe(testBust);
    });

    test('should use default function for cacheBust if cacheBust is true', () => {
      const testBust = true;
      const testValue = 'test';
      const testConfig = {
        cacheBust: testBust,
      };
      Date.now = jest.fn(() => {
        return testValue;
      });
      TestAvApi.cacheParams(testConfig);
      expect(testConfig.params.cacheBust).toBe(testValue);
      expect(Date.now).toHaveBeenCalled();
    });

    test('should set pageBust if pageBust in config', () => {
      const testBust = 'test';
      const testConfig = {
        pageBust: testBust,
      };
      TestAvApi.cacheParams(testConfig);
      expect(testConfig.params.pageBust).toBe(testBust);
    });

    test('should use default function for pageBust if pageBust is true', () => {
      const testBust = true;
      const testValue = 'test';
      const testConfig = {
        pageBust: testBust,
      };
      TestAvApi.getPageBust = jest.fn(() => {
        return testValue;
      });
      TestAvApi.cacheParams(testConfig);
      expect(testConfig.params.pageBust).toBe(testValue);
      expect(TestAvApi.getPageBust).toHaveBeenCalled();
    });

    test('should set sessionBust if sessionBust in config', () => {
      const testBust = 'test';
      const testConfig = {
        sessionBust: testBust,
      };
      TestAvApi.cacheParams(testConfig);
      expect(testConfig.params.sessionBust).toBe(testBust);
    });

    test("sessionBust defaultFn should use localStorage's sessionBust when available", () => {
      const localStorageVal = 'test';
      AvLocalStorage.getSessionBust = jest.fn(() => {
        return localStorageVal;
      });
      const testConfig = {
        sessionBust: true,
      };
      TestAvApi.cacheParams(testConfig);
      expect(testConfig.params.sessionBust).toBe(localStorageVal);
      expect(AvLocalStorage.getSessionBust).toBeCalled();
    });

    test("sessionBust defaultFn should use pageBust value when  localStorage's sessionBust is not available", () => {
      AvLocalStorage.getSessionBust = jest.fn(() => {});
      const testPageBust = 'testPage';
      TestAvApi.pageBustValue = testPageBust;
      const testConfig = {
        sessionBust: true,
      };
      TestAvApi.cacheParams(testConfig);
      expect(testConfig.params.sessionBust).toBe(testPageBust);
      expect(AvLocalStorage.getSessionBust).toBeCalled();
    });
  });

  describe('getUrl', () => {
    beforeEach(() => {
      TestAvApi = new AvApi(mockHttp, Promise, {});
    });

    test('should return config.url if config.api is false', () => {
      const testUrl = 'test';
      const testConfig = {
        api: false,
        url: testUrl,
      };
      expect(TestAvApi.getUrl(testConfig)).toBe(testUrl);
    });

    test('should return config.url if no config.name or id', () => {
      const testUrl = 'test';
      const testConfig = {
        api: true,
        url: testUrl,
      };
      expect(TestAvApi.getUrl(testConfig)).toBe(testUrl);
    });

    test('should return joined config.url and id if no config.name', () => {
      const testUrl = 'test';
      const testId = 'testId';
      const testExpected = testUrl + '/' + testId;
      const testConfig = {
        api: true,
        url: testUrl,
      };
      expect(TestAvApi.getUrl(testConfig, testId)).toBe(testExpected);
    });

    test('should return joined path, version, name when name provided', () => {
      const testConfig = {
        api: true,
        path: 'api',
        version: 'v1',
        name: 'test',
      };
      const testExpected = '/api/v1/test';
      expect(TestAvApi.getUrl(testConfig)).toBe(testExpected);
    });

    test('should return joined path, version, name, and id when name provided', () => {
      const testConfig = {
        api: true,
        path: 'api',
        version: 'v1',
        name: 'test',
      };
      const testId = 'id';
      const testExpected = '/api/v1/test/id';
      expect(TestAvApi.getUrl(testConfig, testId)).toBe(testExpected);
    });

    test("should remove multiple and trailing /'s", () => {
      const testConfig = {
        api: true,
        path: '/api/',
        version: '/v1/',
        name: '/test/',
      };
      const testExpected = '/api/v1/test';
      expect(TestAvApi.getUrl(testConfig)).toBe(testExpected);
    });
  });

  describe('getLocation', () => {
    beforeEach(() => {
      TestAvApi = new AvApi(mockHttp, Promise, {});
    });

    test('should return false when polling is turned off', () => {
      const testResponse = {
        config: {
          polling: false,
        },
      };
      expect(TestAvApi.getLocation(testResponse)).toBeFalsy();
    });

    test('should return false when status is not 202', () => {
      const testResponse = {
        config: {
          polling: true,
        },
        status: 200,
      };
      expect(TestAvApi.getLocation(testResponse)).toBeFalsy();
    });

    test('should return false when attempt is larger than polling intervals', () => {
      const testResponse = {
        config: {
          polling: true,
          pollingIntervals: [100],
          attempt: 1,
        },
        status: 202,
      };
      expect(TestAvApi.getLocation(testResponse)).toBeFalsy();
    });

    test('should call config.getHeader() when polling is available', () => {
      const testLocation = 'test';
      const getHeader = jest.fn(() => {
        return testLocation;
      });
      const testResponse = {
        config: {
          polling: true,
          pollingIntervals: [100],
          attempt: 0,
          getHeader,
        },
        status: 202,
      };
      expect(TestAvApi.getLocation(testResponse)).toBe(testLocation);
      expect(getHeader).toHaveBeenCalledTimes(1);
      expect(getHeader).toHaveBeenCalledWith(testResponse, 'Location');
    });

    test('should return response.headers.Location without config.getHeader', () => {
      const testLocation = 'test';
      const testResponse = {
        config: {
          polling: true,
          pollingIntervals: [100],
          attempt: 0,
        },
        status: 202,
        headers: {
          Location: testLocation,
        },
      };
      expect(TestAvApi.getLocation(testResponse)).toBe(testLocation);
    });
  });

  describe('onResponse', () => {
    const testLocation = 'testLocation';

    const testInterval = 100;
    const testNewConfig = {
      url: 'url',
      pollingIntervals: [testInterval],
      attempt: 0,
    };
    const expectedNewConfig = {
      url: testLocation,
      method: 'GET',
      cache: false,
      pollingIntervals: [testInterval],
      attempt: 0,
    };

    beforeEach(() => {
      TestAvApi = new AvApi(mockHttp, Promise, {});
      TestAvApi.getLocation = jest.fn(() => {
        return testLocation;
      });
      TestAvApi.makeRequest = jest.fn();
      TestAvApi.config = jest.fn(() => {
        return testNewConfig;
      });
    });

    test('should return response if no polling or afterResponse', () => {
      const testResponse = {
        testKey: 'test',
      };
      TestAvApi.getLocation.mockImplementationOnce(() => {
        return false;
      });
      expect(TestAvApi.onResponse(testResponse)).toEqual(testResponse);
      expect(TestAvApi.makeRequest).not.toBeCalled();
    });

    test('should return result of afterResponse if no polling', () => {
      const testResponse = {
        testKey: 'test',
      };
      const testResponse2 = {
        otherKey: 'test2',
      };
      TestAvApi.getLocation.mockImplementationOnce(() => {
        return false;
      });
      const afterResponse = jest.fn(() => {
        return testResponse2;
      });
      expect(TestAvApi.onResponse(testResponse, afterResponse)).toEqual(
        testResponse2
      );
      expect(TestAvApi.makeRequest).not.toBeCalled();
      expect(afterResponse).toBeCalledWith(testResponse);
    });

    test('should makeRequest when polling', () => {
      const mockAfterResponse = 'after';
      const mockConfig = {
        testVal: 'test',
      };

      const output = TestAvApi.onResponse(
        { config: mockConfig },
        mockAfterResponse
      ).then(() => {
        expect(TestAvApi.config).toHaveBeenCalledWith(mockConfig);
        expect(setTimeout).toHaveBeenCalledTimes(1);
        expect(setTimeout.mock.calls[0][1]).toBe(testInterval);
        expect(TestAvApi.makeRequest).toHaveBeenCalledWith(
          expectedNewConfig,
          mockAfterResponse
        );
      });
      jest.runAllTimers();
      return output;
    });
  });

  describe('makeRequest', () => {
    const mockFinalResponse = 'finalResponse';

    beforeEach(() => {
      TestAvApi = new AvApi(mockHttp, Promise, {});
      TestAvApi.onResponse = jest.fn(() => {
        return mockFinalResponse;
      });
    });

    test('should call http', () => {
      const mockConfig = {
        testVal: 'test',
      };
      return TestAvApi.makeRequest(mockConfig).then(response => {
        expect(response).toEqual(mockFinalResponse);
        expect(mockHttp).toHaveBeenCalledWith(mockConfig);
      });
    });

    test('should catch error in http, returning error.response if it exists', () => {
      mockHttp.mockImplementationOnce(() => {
        return Promise.reject({ response: 'errResponse' }, 'response');
      });
      return TestAvApi.makeRequest({}).then(response => {
        expect(response).toBe('errResponse');
      });
    });

    test('should catch error in http, returning undefined if no error.response', () => {
      mockHttp.mockImplementationOnce(() => {
        return Promise.reject('err');
      });
      return TestAvApi.makeRequest({}).then(response => {
        expect(response).toBeUndefined();
      });
    });

    test('should default attempt in polling is true', () => {
      const mockConfig = {
        polling: true,
      };
      const expectedConfig = {
        polling: true,
        attempt: 0,
      };
      return TestAvApi.makeRequest(mockConfig).then(response => {
        expect(mockHttp).toHaveBeenCalledWith(expectedConfig);
        expect(response).toEqual(mockFinalResponse);
      });
    });
  });

  describe('request builders', () => {
    const testUrl = 'url';
    beforeEach(() => {
      TestAvApi = new AvApi(mockHttp, Promise, {});
      TestAvApi.makeRequest = jest.fn();
      TestAvApi.cacheParams = jest.fn();
      TestAvApi.config = jest.fn(config => Object.assign({}, config));
      TestAvApi.getUrl = jest.fn(() => testUrl);
    });

    test('create() setting method data and url', () => {
      const config = {
        testValue: 'test',
      };
      const data = {
        testData: 'data',
      };
      const expectedConfig = Object.assign(
        {
          method: 'POST',
          url: testUrl,
        },
        config,
        { data }
      );
      TestAvApi.create(data, config);
      expect(TestAvApi.getUrl).toHaveBeenLastCalledWith(expectedConfig);
      expect(TestAvApi.makeRequest).toHaveBeenLastCalledWith(
        expectedConfig,
        undefined
      );
    });

    test('create() passes data through beforeCreate() if defined', () => {
      const config = {
        testValue: 'test',
      };
      const data = {
        testData: 'data',
      };
      const expectedConfig = Object.assign(
        {
          method: 'POST',
          url: testUrl,
        },
        config,
        { data }
      );
      TestAvApi.beforeCreate = jest.fn(thisData => {
        return thisData;
      });
      TestAvApi.create(data, config);
      expect(TestAvApi.getUrl).toHaveBeenLastCalledWith(expectedConfig);
      expect(TestAvApi.makeRequest).toHaveBeenLastCalledWith(
        expectedConfig,
        undefined
      );
      expect(TestAvApi.beforeCreate).toHaveBeenLastCalledWith(data);
    });

    test('create() throws error without data', () => {
      const config = {
        testValue: 'test',
      };
      const data = false;
      expect(() => {
        TestAvApi.create(data, config);
      }).toThrow('called method without [data]');
    });

    test('postGet() setting method data and url', () => {
      const config = {
        testValue: 'test',
      };
      const data = {
        testData: 'data',
      };
      const expectedConfig = Object.assign(
        {
          method: 'POST',
          url: testUrl,
          headers: {
            'X-HTTP-Method-Override': 'GET',
          },
        },
        config,
        { data }
      );
      TestAvApi.postGet(data, config);
      expect(TestAvApi.getUrl).toHaveBeenLastCalledWith(expectedConfig);
      expect(TestAvApi.makeRequest).toHaveBeenLastCalledWith(
        expectedConfig,
        undefined
      );
    });

    test('postGet() passes data through beforeCreate() if defined', () => {
      const config = {
        testValue: 'test',
      };
      const data = {
        testData: 'data',
      };
      const expectedConfig = Object.assign(
        {
          method: 'POST',
          url: testUrl,
          headers: {
            'X-HTTP-Method-Override': 'GET',
          },
        },
        config,
        { data }
      );
      TestAvApi.beforePostGet = jest.fn(thisData => {
        return thisData;
      });
      TestAvApi.postGet(data, config);
      expect(TestAvApi.getUrl).toHaveBeenLastCalledWith(expectedConfig);
      expect(TestAvApi.makeRequest).toHaveBeenLastCalledWith(
        expectedConfig,
        undefined
      );
      expect(TestAvApi.beforePostGet).toHaveBeenLastCalledWith(data);
    });

    test('postGet() throws error without data', () => {
      const config = {
        testValue: 'test',
      };
      const data = false;
      expect(() => {
        TestAvApi.postGet(data, config);
      }).toThrow('called method without [data]');
    });

    test('get() setting method and url', () => {
      const config = {
        testValue: 'test',
      };
      const id = 'id';
      const expectedConfig = Object.assign(
        {
          method: 'GET',
          url: testUrl,
        },
        config
      );
      TestAvApi.get(id, config);
      expect(TestAvApi.getUrl).toHaveBeenLastCalledWith(expectedConfig, id);
      expect(TestAvApi.cacheParams).toHaveBeenLastCalledWith(expectedConfig);
      expect(TestAvApi.makeRequest).toHaveBeenLastCalledWith(
        expectedConfig,
        undefined
      );
    });

    test('get() throws error without id', () => {
      const config = {
        testValue: 'test',
      };
      const id = false;
      expect(() => {
        TestAvApi.get(id, config);
      }).toThrow('called method without [id]');
    });

    test('query() setting method and url', () => {
      const config = {
        testValue: 'test',
      };
      const expectedConfig = Object.assign(
        {
          method: 'GET',
          url: testUrl,
        },
        config
      );
      TestAvApi.query(config);
      expect(TestAvApi.getUrl).toHaveBeenLastCalledWith(expectedConfig);
      expect(TestAvApi.cacheParams).toHaveBeenLastCalledWith(expectedConfig);
      expect(TestAvApi.makeRequest).toHaveBeenLastCalledWith(
        expectedConfig,
        undefined
      );
    });

    test('update() setting method data and url', () => {
      const config = {
        testValue: 'test',
      };
      const id = 'id';
      const data = {
        testData: 'data',
      };
      const expectedConfig = Object.assign(
        {
          method: 'PUT',
          url: testUrl,
        },
        config,
        { data }
      );
      TestAvApi.update(id, data, config);
      expect(TestAvApi.getUrl).toHaveBeenLastCalledWith(expectedConfig, id);
      expect(TestAvApi.makeRequest).toHaveBeenLastCalledWith(
        expectedConfig,
        undefined
      );
    });

    test('update() passes data through beforeUpdate() if defined', () => {
      const config = {
        testValue: 'test',
      };
      const id = 'id';
      const data = {
        testData: 'data',
      };
      const expectedConfig = Object.assign(
        {
          method: 'PUT',
          url: testUrl,
        },
        config,
        { data }
      );
      TestAvApi.beforeUpdate = jest.fn(thisData => {
        return thisData;
      });
      TestAvApi.update(id, data, config);
      expect(TestAvApi.getUrl).toHaveBeenLastCalledWith(expectedConfig, id);
      expect(TestAvApi.makeRequest).toHaveBeenLastCalledWith(
        expectedConfig,
        undefined
      );
    });

    test('update() should use only two arguments as data and config', () => {
      const config = {
        testValue: 'test',
      };
      const data = {
        testData: 'data',
      };
      const expectedConfig = Object.assign(
        {
          method: 'PUT',
          url: testUrl,
        },
        config,
        { data }
      );
      TestAvApi.beforeUpdate = jest.fn(thisData => {
        return thisData;
      });
      TestAvApi.update(data, config);
      expect(TestAvApi.getUrl).toHaveBeenLastCalledWith(expectedConfig, '');
      expect(TestAvApi.makeRequest).toHaveBeenLastCalledWith(
        expectedConfig,
        undefined
      );
    });

    test('remove() setting method and url', () => {
      const config = {
        testValue: 'test',
      };
      const id = 'id';
      const expectedConfig = Object.assign(
        {
          method: 'DELETE',
          url: testUrl,
        },
        config
      );
      TestAvApi.remove(id, config);
      expect(TestAvApi.getUrl).toHaveBeenLastCalledWith(expectedConfig, id);
      expect(TestAvApi.makeRequest).toHaveBeenLastCalledWith(
        expectedConfig,
        undefined
      );
    });

    test('remove() should set first argument as data if not string or number', () => {
      const config = {
        testValue: 'test',
      };
      const data = {
        testData: 'data',
      };
      const expectedConfig = Object.assign(
        {
          method: 'DELETE',
          url: testUrl,
        },
        config,
        { data }
      );
      TestAvApi.remove(data, config);
      expect(TestAvApi.getUrl).toHaveBeenLastCalledWith(expectedConfig, '');
      expect(TestAvApi.makeRequest).toHaveBeenLastCalledWith(
        expectedConfig,
        undefined
      );
    });

    test('remove() should run data through beforeRemove if defined', () => {
      const config = {
        testValue: 'test',
      };
      const data = {
        testData: 'data',
      };
      const expectedConfig = Object.assign(
        {
          method: 'DELETE',
          url: testUrl,
        },
        config,
        { data }
      );
      TestAvApi.beforeRemove = jest.fn(thisData => {
        return thisData;
      });
      TestAvApi.remove(data, config);
      expect(TestAvApi.getUrl).toHaveBeenLastCalledWith(expectedConfig, '');
      expect(TestAvApi.makeRequest).toHaveBeenLastCalledWith(
        expectedConfig,
        undefined
      );
      expect(TestAvApi.beforeRemove).toHaveBeenLastCalledWith(data);
    });
  });
});
