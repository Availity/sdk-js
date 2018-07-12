/* eslint-disable promise/no-callback-in-promise */
import AvApi from '../api';

jest.useFakeTimers();

const mockHttp = jest.fn(() => Promise.resolve({}));
const mockMerge = jest.fn((...args) => Object.assign(...args));

describe('AvApi', () => {
  let api;

  test('AvApi should be defined', () => {
    api = new AvApi({
      http: mockHttp,
      promise: Promise,
      merge: mockMerge,
      config: {},
    });
    expect(api).toBeDefined();
  });

  test('AvApi should throw errors when missing paramaters', () => {
    // expect(() => {
    //   api = new AvApi();
    // }).toThrowError('[http], [promise], [config], and [merge] must be defined');

    expect(() => {
      api = new AvApi({
        http: false,
        promise: false,
        merge: false,
        config: false,
      });
    }).toThrowError('[http], [promise], [config], and [merge] must be defined');

    expect(() => {
      api = new AvApi({
        http: false,
        promise: Promise,
        merge: mockMerge,
        config: {},
      });
    }).toThrowError('[http], [promise], [config], and [merge] must be defined');

    expect(() => {
      api = new AvApi({
        http: mockHttp,
        promise: false,
        merge: mockMerge,
        config: {},
      });
    }).toThrowError('[http], [promise], [config], and [merge] must be defined');

    expect(() => {
      api = new AvApi({
        http: mockHttp,
        promise: Promise,
        merge: false,
        config: {},
      });
    }).toThrowError('[http], [promise], [config], and [merge] must be defined');

    expect(() => {
      api = new AvApi({
        http: mockHttp,
        promise: Promise,
        merge: mockMerge,
        config: false,
      });
    }).toThrowError('[http], [promise], [config], and [merge] must be defined');
  });

  test('getQueryResultKey(data) should determine the key for the list within data', () => {
    const mockConfig = {
      name: 'testName',
    };
    api = new AvApi({
      http: mockHttp,
      promise: Promise,
      merge: mockMerge,
      config: mockConfig,
    });
    expect(
      api.getQueryResultKey({ nope: {}, not: true, yup: [], sorry: 3 })
    ).toEqual('yup');
  });

  test('getResult(data) should return list within data', () => {
    const mockConfig = {
      name: 'testName',
    };
    api = new AvApi({
      http: mockHttp,
      promise: Promise,
      merge: mockMerge,
      config: mockConfig,
    });
    const list = [{}, {}];
    expect(api.getResult({ nope: {}, not: true, yup: list, sorry: 3 })).toEqual(
      list
    );
  });

  test('getPage(config, page, limit) make a request with the right offset', () => {
    const mockConfig = {
      name: 'testName',
    };
    api = new AvApi({
      http: mockHttp,
      promise: Promise,
      merge: mockMerge,
      config: mockConfig,
    });
    api.query = jest.fn();
    const offset = 50;
    const originalConfig = {};
    const newConfig = {};
    api.addParams = jest.fn(({ offset }, config, create) => {
      expect(offset).toBe(0);
      expect(config).toBe(originalConfig);
      expect(create).toBeFalsy();
      return newConfig;
    });
    api.getPage(1, originalConfig, offset);
    expect(api.addParams).toHaveBeenCalled();
    expect(api.query).toHaveBeenCalledWith(newConfig);
  });

  test('config() should merge passed in config with defaultConfig', () => {
    const mockConfig = {
      name: 'testName',
    };
    api = new AvApi({
      http: mockHttp,
      promise: Promise,
      merge: mockMerge,
      config: mockConfig,
    });
    const testConfig = { path: '/api/internal' };
    const testExpectConfig = Object.assign({}, api.defaultConfig, testConfig);
    expect(api.config(testConfig)).toEqual(testExpectConfig);
  });

  describe('getCacheBustVal()', () => {
    beforeEach(() => {
      api = new AvApi({
        http: mockHttp,
        promise: Promise,
        merge: mockMerge,
        config: {},
      });
    });

    test('should return undefined with cache value is falsy', () => {
      const testCache = false;
      expect(api.getCacheBustVal(testCache)).toBeUndefined();
    });

    test('should return passed in value when not boolean or function', () => {
      const testCache = 'test';
      expect(api.getCacheBustVal(testCache)).toBe(testCache);
    });

    test('should return passed in value when true without default function', () => {
      const testCache = true;
      expect(api.getCacheBustVal(testCache)).toBe(testCache);
    });

    test('should call and return default function when passed in value true', () => {
      const testCache = true;
      const testResponse = 'test';
      const defaultFn = jest.fn(() => testResponse);
      expect(api.getCacheBustVal(testCache, defaultFn)).toBe(testResponse);
      expect(defaultFn).toBeCalled();
    });

    test('should call and return passed in function', () => {
      const testResponse = 'test';
      const testCache = jest.fn(() => testResponse);
      const defaultFn = jest.fn(() => `${testResponse}2`);
      expect(api.getCacheBustVal(testCache, defaultFn)).toBe(testResponse);
      expect(testCache).toBeCalled();
      expect(defaultFn).not.toBeCalled();
    });
  });

  test('setPageBust() should set to passed in value', () => {
    api = new AvApi({
      http: mockHttp,
      promise: Promise,
      merge: mockMerge,
      config: {},
    });
    const test = 'test';
    api.setPageBust(test);
    expect(api.pageBustValue).toBe(test);
  });

  test('setPageBust() should use Date.now()', () => {
    api = new AvApi({
      http: mockHttp,
      promise: Promise,
      merge: mockMerge,
      config: {},
    });
    const test = 'test';
    Date.now = jest.fn(() => test);
    api.setPageBust();
    expect(api.pageBustValue).toBe(test);
    expect(Date.now).toBeCalled();
  });

  test('getPageBust() should return pageBustValue() if set', () => {
    api = new AvApi({
      http: mockHttp,
      promise: Promise,
      merge: mockMerge,
      config: {},
    });
    const test = 'test';
    api.pageBustValue = test;
    expect(api.getPageBust()).toBe(test);
  });

  test('getPageBust() should set pageBustValue() if not set yet', () => {
    api = new AvApi({
      http: mockHttp,
      promise: Promise,
      merge: mockMerge,
      config: {},
    });
    const test = 'test';
    api.setPageBust = jest.fn(() => {
      api.pageBustValue = test;
    });
    expect(api.getPageBust()).toBe(test);
    expect(api.setPageBust).toBeCalled();
  });

  describe('addParams', () => {
    beforeEach(() => {
      api = new AvApi({
        http: mockHttp,
        promise: Promise,
        merge: mockMerge,
        config: {},
      });
    });

    test("should merge params into the config's", () => {
      const configParams = {
        part1: 'hello',
      };
      const testParams = {
        part2: 'world',
      };
      const expectedParams = Object.assign({}, configParams, testParams);

      const testConfig = { params: configParams };
      const expectedResults = { params: expectedParams };

      expect(api.addParams(testParams, testConfig)).toEqual(expectedResults);
    });

    test('should not modify passed in config by default', () => {
      const configParams = {
        part1: 'hello',
      };
      const testParams = {
        part2: 'world',
      };
      const expectedParams = Object.assign({}, configParams, testParams);

      const testConfig = { params: configParams };
      const testConfig2 = { params: configParams };
      const expectedResults = { params: expectedParams };

      const result = api.addParams(testParams, testConfig);
      expect(testConfig).toEqual(testConfig2);
      expect(result).not.toBe(testConfig);
      expect(result).toEqual(expectedResults);
    });

    test('should modify passed in config with 3rd param false', () => {
      const configParams = {
        part1: 'hello',
      };
      const testParams = {
        part2: 'world',
      };
      const expectedParams = Object.assign({}, configParams, testParams);

      const testConfig = { params: configParams };
      const testConfig2 = { params: configParams };
      const expectedResults = { params: expectedParams };

      const result = api.addParams(testParams, testConfig, false);
      expect(testConfig).not.toEqual(testConfig2);
      expect(result).toBe(testConfig);
      expect(result).toEqual(expectedResults);
    });
  });

  describe('cacheParams', () => {
    beforeEach(() => {
      api = new AvApi({
        http: mockHttp,
        promise: Promise,
        merge: mockMerge,
        config: {},
      });
    });

    test('should make sure params object exists, if adding cache', () => {
      const testConfig = { cacheBust: true };
      api.cacheParams(testConfig);
      expect(testConfig.params).toBeDefined();
    });

    test('should set cacheBust if cacheBust in config', () => {
      const testBust = 'test';
      const testConfig = {
        cacheBust: testBust,
      };
      api.cacheParams(testConfig);
      expect(testConfig.params.cacheBust).toBe(testBust);
    });

    test('should use default function for cacheBust if cacheBust is true', () => {
      const testBust = true;
      const testValue = 'test';
      const testConfig = {
        cacheBust: testBust,
      };
      Date.now = jest.fn(() => testValue);
      api.cacheParams(testConfig);
      expect(testConfig.params.cacheBust).toBe(testValue);
      expect(Date.now).toHaveBeenCalled();
    });

    test('should set pageBust if pageBust in config', () => {
      const testBust = 'test';
      const testConfig = {
        pageBust: testBust,
      };
      api.cacheParams(testConfig);
      expect(testConfig.params.pageBust).toBe(testBust);
    });

    test('should use default function for pageBust if pageBust is true', () => {
      const testBust = true;
      const testValue = 'test';
      const testConfig = {
        pageBust: testBust,
      };
      api.getPageBust = jest.fn(() => testValue);
      api.cacheParams(testConfig);
      expect(testConfig.params.pageBust).toBe(testValue);
      expect(api.getPageBust).toHaveBeenCalled();
    });

    test('should set sessionBust if sessionBust in config', () => {
      const testBust = 'test';
      const testConfig = {
        sessionBust: testBust,
      };
      api.cacheParams(testConfig);
      expect(testConfig.params.sessionBust).toBe(testBust);
    });

    test("sessionBust defaultFn should use localStorage's sessionBust when available", () => {
      const localStorageVal = 'test';
      api.localStorage.getSessionBust = jest.fn(() => localStorageVal);
      const testConfig = {
        sessionBust: true,
      };
      api.cacheParams(testConfig);
      expect(testConfig.params.sessionBust).toBe(localStorageVal);
      expect(api.localStorage.getSessionBust).toBeCalled();
    });

    test("sessionBust defaultFn should use pageBust value when  localStorage's sessionBust is not available", () => {
      api.localStorage.getSessionBust = jest.fn(() => {});
      const testPageBust = 'testPage';
      api.pageBustValue = testPageBust;
      const testConfig = {
        sessionBust: true,
      };
      api.cacheParams(testConfig);
      expect(testConfig.params.sessionBust).toBe(testPageBust);
      expect(api.localStorage.getSessionBust).toBeCalled();
    });
  });

  describe('getUrl', () => {
    beforeEach(() => {
      api = new AvApi({
        http: mockHttp,
        promise: Promise,
        merge: mockMerge,
        config: {},
      });
    });

    test('should return config.url if config.api is false', () => {
      const testUrl = 'test';
      const testConfig = {
        api: false,
        url: testUrl,
      };
      expect(api.getUrl(testConfig)).toBe(testUrl);
    });

    test('should return config.url if no config.name or id', () => {
      const testUrl = 'test';
      const testConfig = {
        api: true,
        url: testUrl,
      };
      expect(api.getUrl(testConfig)).toBe(testUrl);
    });

    test('should return joined config.url and id if no config.name', () => {
      const testUrl = 'test';
      const testId = 'testId';
      const testExpected = `${testUrl}/${testId}`;
      const testConfig = {
        api: true,
        url: testUrl,
      };
      expect(api.getUrl(testConfig, testId)).toBe(testExpected);
    });

    test('should return joined path, version, name when name provided', () => {
      const testConfig = {
        api: true,
        path: 'api',
        version: 'v1',
        name: 'test',
      };
      const testExpected = '/api/v1/test';
      expect(api.getUrl(testConfig)).toBe(testExpected);
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
      expect(api.getUrl(testConfig, testId)).toBe(testExpected);
    });

    test("should remove multiple and trailing /'s", () => {
      const testConfig = {
        api: true,
        path: '/api/',
        version: '/v1/',
        name: '/test/',
      };
      const testExpected = '/api/v1/test';
      expect(api.getUrl(testConfig)).toBe(testExpected);
    });

    test('getRequestUrl() should without passing in config', () => {
      const fakeApi = new AvApi({
        http: mockHttp,
        promise: Promise,
        merge: mockMerge,
        config: {
          api: true,
          path: '/api/',
          version: '/v1/',
          name: '/test',
        },
      });
      expect(fakeApi.getRequestUrl()).toBe('/api/v1/test');
    });
  });

  describe('getLocation', () => {
    beforeEach(() => {
      api = new AvApi({
        http: mockHttp,
        promise: Promise,
        merge: mockMerge,
        config: {},
      });
    });

    test('should return false when polling is turned off', () => {
      const testResponse = {
        config: {
          polling: false,
        },
      };
      expect(api.shouldPoll(testResponse)).toBeFalsy();
    });

    test('should return false when status is not 202', () => {
      const testResponse = {
        config: {
          polling: true,
        },
        status: 200,
      };
      expect(api.shouldPoll(testResponse)).toBeFalsy();
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
      expect(api.shouldPoll(testResponse)).toBeFalsy();
    });

    test('should call config.getHeader() when polling is available', () => {
      const testLocation = 'test';
      const getHeader = jest.fn(() => testLocation);
      const testResponse = {
        config: {
          polling: true,
          pollingIntervals: [100],
          attempt: 0,
          getHeader,
        },
        status: 202,
      };
      expect(api.getLocation(testResponse)).toBe(testLocation);
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
      expect(api.getLocation(testResponse)).toBe(testLocation);
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
      api = new AvApi({
        http: mockHttp,
        promise: Promise,
        merge: mockMerge,
        config: {},
      });
      api.shouldPoll = jest.fn();
      api.getLocation = jest.fn(() => testLocation);
      api.request = jest.fn();
      api.config = jest.fn(() => testNewConfig);
    });

    test('should return response if no polling or afterResponse', () => {
      const testResponse = {
        testKey: 'test',
      };
      api.getLocation.mockImplementationOnce(() => false);
      expect(api.onResponse(testResponse)).toEqual(testResponse);
      expect(api.request).not.toBeCalled();
    });

    test('should return result of afterResponse if no polling', () => {
      const testResponse = {
        testKey: 'test',
      };
      const testResponse2 = {
        otherKey: 'test2',
      };
      api.getLocation.mockImplementationOnce(() => false);
      const afterResponse = jest.fn(() => testResponse2);
      expect(api.onResponse(testResponse, afterResponse)).toEqual(
        testResponse2
      );
      expect(api.request).not.toBeCalled();
      expect(afterResponse).toBeCalledWith(testResponse);
    });

    test('should request when polling', () => {
      api.shouldPoll = jest.fn(() => true);
      api.getLocation = jest.fn(() => testLocation);

      const mockAfterResponse = { testKey: 'after' };
      const afterResponse = jest.fn(() => mockAfterResponse);

      const mockConfig = {
        testVal: 'test',
      };

      const output = api
        .onResponse({ config: mockConfig }, afterResponse)
        .then(() => {
          expect(api.config).toHaveBeenCalledWith(mockConfig);
          expect(setTimeout).toHaveBeenCalledTimes(1);
          expect(setTimeout.mock.calls[0][1]).toBe(testInterval);
          expect(api.request).toHaveBeenCalledWith(
            expectedNewConfig,
            afterResponse
          );
          return true;
        });

      jest.runAllTimers();
      return output;
    });
  });

  describe('request', () => {
    const mockFinalResponse = 'finalResponse';

    beforeEach(() => {
      api = new AvApi({
        http: mockHttp,
        promise: Promise,
        merge: mockMerge,
        config: {},
      });
      api.onResponse = jest.fn(() => mockFinalResponse);
    });

    test('should call http', async () => {
      const mockConfig = {
        testVal: 'test',
      };
      const response = await api.request(mockConfig);
      expect(response).toEqual(mockFinalResponse);
      expect(mockHttp).toHaveBeenCalledWith(mockConfig);
    });

    test('should catch error in http, returning undefined if no error.response', async () => {
      mockHttp.mockImplementationOnce(() => Promise.reject(new Error('err')));
      const response = await api.request({});
      expect(response).toBeUndefined();
    });

    test('should default attempt in polling is true', async () => {
      const mockConfig = {
        polling: true,
      };
      const expectedConfig = {
        polling: true,
        attempt: 1,
      };

      const response = await api.request(mockConfig);
      expect(mockHttp).toHaveBeenCalledWith(expectedConfig);
      expect(response).toEqual(mockFinalResponse);
    });
  });

  describe('request builders', () => {
    const testUrl = 'url';
    beforeEach(() => {
      api = new AvApi({
        http: mockHttp,
        promise: Promise,
        merge: mockMerge,
        config: {},
      });
      api.request = jest.fn(() =>
        Promise.resolve({
          data: { offset: 0, limit: 50, totalCount: 0, count: 0, list: [] },
        })
      );
      api.cacheParams = jest.fn(config => Object.assign({}, config));
      api.config = jest.fn(config => Object.assign({}, config));
      api.getUrl = jest.fn(() => testUrl);
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
      api.create(data, config);
      expect(api.getUrl).toHaveBeenLastCalledWith(expectedConfig);
      expect(api.request).toHaveBeenLastCalledWith(expectedConfig, undefined);
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
      api.beforeCreate = jest.fn(thisData => thisData);
      api.create(data, config);
      expect(api.getUrl).toHaveBeenLastCalledWith(expectedConfig);
      expect(api.request).toHaveBeenLastCalledWith(expectedConfig, undefined);
      expect(api.beforeCreate).toHaveBeenLastCalledWith(data);
    });

    test('create() throws error without data', () => {
      const config = {
        testValue: 'test',
      };
      const data = false;
      expect(() => {
        api.create(data, config);
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
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
        config,
        { data: 'testData=data' }
      );
      api.postGet(data, config);
      expect(api.getUrl).toHaveBeenLastCalledWith(expectedConfig);
      expect(api.request).toHaveBeenLastCalledWith(expectedConfig, undefined);
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
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
        config,
        { data: 'testData=data' }
      );
      api.beforePostGet = jest.fn(thisData => thisData);
      api.postGet(data, config);
      expect(api.getUrl).toHaveBeenLastCalledWith(expectedConfig);
      expect(api.request).toHaveBeenLastCalledWith(expectedConfig, undefined);
      expect(api.beforePostGet).toHaveBeenLastCalledWith(data);
    });

    test('postGet() throws error without data', () => {
      const config = {
        testValue: 'test',
      };
      const data = false;
      expect(() => {
        api.postGet(data, config);
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
      api.get(id, config);
      expect(api.getUrl).toHaveBeenLastCalledWith(expectedConfig, id);
      expect(api.cacheParams).toHaveBeenLastCalledWith(expectedConfig);
      expect(api.request).toHaveBeenLastCalledWith(expectedConfig, undefined);
    });

    test('get() throws error without id', () => {
      const config = {
        testValue: 'test',
      };
      const id = false;
      expect(() => {
        api.get(id, config);
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
      api.query(config);
      expect(api.getUrl).toHaveBeenLastCalledWith(expectedConfig);
      expect(api.cacheParams).toHaveBeenLastCalledWith(expectedConfig);
      expect(api.request).toHaveBeenLastCalledWith(expectedConfig, undefined);
    });

    test('all() setting method and url', () => {
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
      api.all(config);
      expect(api.getUrl).toHaveBeenLastCalledWith(expectedConfig);
      expect(api.cacheParams).toHaveBeenLastCalledWith(expectedConfig);
      expect(api.request).toHaveBeenLastCalledWith(expectedConfig, undefined);
    });

    test('all() getting next pages', done => {
      const config = {
        testValue: 'test',
      };
      api.request = jest.fn(config => {
        if ((config.params && config.params.offset === 0) || !config.params) {
          return Promise.resolve({
            data: {
              offset: 0,
              limit: 50,
              totalCount: 125,
              count: 50,
              list: ['page 1'],
            },
          });
        }
        if (config.params.offset === 50) {
          return Promise.resolve({
            data: {
              offset: 50,
              limit: 50,
              totalCount: 125,
              count: 50,
              list: ['page 2'],
            },
          });
        }
        if (config.params.offset === 100) {
          return Promise.resolve({
            data: {
              offset: 100,
              limit: 50,
              totalCount: 125,
              count: 25,
              list: ['page 3'],
            },
          });
        }
        throw new Error('Called with unexpected offset');
      });
      api
        .all(config)
        .then(data => {
          expect(api.request).toHaveBeenCalledTimes(3);
          expect(data).toEqual(['page 1', 'page 2', 'page 3']);
          return done();
        })
        .catch(done);
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
      api.update(id, data, config);
      expect(api.getUrl).toHaveBeenLastCalledWith(expectedConfig, id);
      expect(api.request).toHaveBeenLastCalledWith(expectedConfig, undefined);
    });

    test('update() calls beforeUpdate() if defined', () => {
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
      api.beforeUpdate = jest.fn(thisData => thisData);
      api.update(id, data, config);
      expect(api.getUrl).toHaveBeenLastCalledWith(expectedConfig, id);
      expect(api.request).toHaveBeenLastCalledWith(expectedConfig, undefined);
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
      api.beforeUpdate = jest.fn(thisData => thisData);
      api.update(data, config);
      expect(api.getUrl).toHaveBeenLastCalledWith(expectedConfig, '');
      expect(api.request).toHaveBeenLastCalledWith(expectedConfig, undefined);
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
      api.remove(id, config);
      expect(api.getUrl).toHaveBeenLastCalledWith(expectedConfig, id);
      expect(api.request).toHaveBeenLastCalledWith(expectedConfig, undefined);
    });

    test('remove() should set first argument as config if not string or number', () => {
      const config = {
        method: 'DELETE',
        url: testUrl,
        data: {
          a: '1',
          b: '2',
        },
      };
      api.remove(config);
      expect(api.getUrl).toHaveBeenLastCalledWith(config, '');
      expect(api.request).toHaveBeenLastCalledWith(config, undefined);
    });

    test('remove() should call beforeRemove() if defined', () => {
      const config = {
        method: 'DELETE',
        url: testUrl,
        data: {
          a: '1',
          b: '2',
        },
      };
      api.beforeRemove = jest.fn(thisData => thisData);
      api.remove(config);
      expect(api.getUrl).toHaveBeenLastCalledWith(config, '');
      expect(api.request).toHaveBeenLastCalledWith(config, undefined);
      expect(api.beforeRemove).toHaveBeenLastCalledWith(config);
    });
  });
});
