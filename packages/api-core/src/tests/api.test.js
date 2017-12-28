import AvApi from '../api';

jest.useFakeTimers();

const mockHttp = jest.fn(() => Promise.resolve({}));

describe('AvApi', () => {
  let api;

  test('AvApi should be defined', () => {
    api = new AvApi(mockHttp, {}, Promise);
    expect(api).toBeDefined();
  });

  test('AvApi should throw errors when missing paramaters', () => {
    expect(() => {
      api = new AvApi();
    }).toThrowError('[http], [promise] and [config] and must be defined');

    expect(() => {
      api = new AvApi(false, false, false);
    }).toThrowError('[http], [promise] and [config] and must be defined');

    expect(() => {
      api = new AvApi(false, Promise, {});
    }).toThrowError('[http], [promise] and [config] and must be defined');

    expect(() => {
      api = new AvApi(mockHttp, Promise, false);
    }).toThrowError('[http], [promise] and [config] and must be defined');

    expect(() => {
      api = new AvApi(mockHttp, false, Promise);
    }).toThrowError('[http], [promise] and [config] and must be defined');

    expect(() => {
      api = new AvApi(false, Promise, false);
    }).toThrowError('[http], [promise] and [config] and must be defined');

    expect(() => {
      api = new AvApi(mockHttp, false, false);
    }).toThrowError('[http], [promise] and [config] and must be defined');

    expect(() => {
      api = new AvApi(false, false, {});
    }).toThrowError('[http], [promise] and [config] and must be defined');
  });

  test('config() should merge passed in config with defaultConfig', () => {
    const mockConfig = {
      name: 'testName',
    };
    api = new AvApi(mockHttp, Promise, mockConfig);
    const testConfig = { path: '/api/internal' };
    const testExpectConfig = Object.assign({}, api.defaultConfig, testConfig);
    expect(api.config(testConfig)).toEqual(testExpectConfig);
  });

  describe('getCacheBustVal()', () => {
    beforeEach(() => {
      api = new AvApi(mockHttp, Promise, {});
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
    api = new AvApi(mockHttp, Promise, {});
    const test = 'test';
    api.setPageBust(test);
    expect(api.pageBustValue).toBe(test);
  });

  test('setPageBust() should use Date.now()', () => {
    api = new AvApi(mockHttp, Promise, {});
    const test = 'test';
    Date.now = jest.fn(() => test);
    api.setPageBust();
    expect(api.pageBustValue).toBe(test);
    expect(Date.now).toBeCalled();
  });

  test('getPageBust() should return pageBustValue() if set', () => {
    api = new AvApi(mockHttp, Promise, {});
    const test = 'test';
    api.pageBustValue = test;
    expect(api.getPageBust()).toBe(test);
  });

  test('getPageBust() should set pageBustValue() if not set yet', () => {
    api = new AvApi(mockHttp, Promise, {});
    const test = 'test';
    api.setPageBust = jest.fn(() => {
      api.pageBustValue = test;
    });
    expect(api.getPageBust()).toBe(test);
    expect(api.setPageBust).toBeCalled();
  });

  describe('cacheParams', () => {
    beforeEach(() => {
      api = new AvApi(mockHttp, Promise, {});
    });

    test('should make sure params object exists', () => {
      const testConfig = {};
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
      api = new AvApi(mockHttp, Promise, {});
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
      const fakeAPi = new AvApi(mockHttp, Promise, {
        api: true,
        path: '/api/',
        version: '/v1/',
        name: '/test',
      });
      expect(fakeAPi.getRequestUrl()).toBe('/api/v1/test');
    });
  });

  describe('getLocation', () => {
    beforeEach(() => {
      api = new AvApi(mockHttp, Promise, {});
    });

    test('should return false when polling is turned off', () => {
      const testResponse = {
        config: {
          polling: false,
        },
      };
      expect(api.getLocation(testResponse)).toBeFalsy();
    });

    test('should return false when status is not 202', () => {
      const testResponse = {
        config: {
          polling: true,
        },
        status: 200,
      };
      expect(api.getLocation(testResponse)).toBeFalsy();
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
      expect(api.getLocation(testResponse)).toBeFalsy();
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
      api = new AvApi(mockHttp, Promise, {});
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
      const mockAfterResponse = 'after';
      const mockConfig = {
        testVal: 'test',
      };

      const output = api
        .onResponse({ config: mockConfig }, mockAfterResponse)
        .then(() => {
          expect(api.config).toHaveBeenCalledWith(mockConfig);
          expect(setTimeout).toHaveBeenCalledTimes(1);
          expect(setTimeout.mock.calls[0][1]).toBe(testInterval);
          expect(api.request).toHaveBeenCalledWith(
            expectedNewConfig,
            mockAfterResponse
          );
        });
      jest.runAllTimers();
      return output;
    });
  });

  describe('request', () => {
    const mockFinalResponse = 'finalResponse';

    beforeEach(() => {
      api = new AvApi(mockHttp, Promise, {});
      api.onResponse = jest.fn(() => mockFinalResponse);
    });

    test('should call http', () => {
      const mockConfig = {
        testVal: 'test',
      };
      return api.request(mockConfig).then(response => {
        expect(response).toEqual(mockFinalResponse);
        expect(mockHttp).toHaveBeenCalledWith(mockConfig);
      });
    });

    test('should catch error in http, returning undefined if no error.response', () => {
      mockHttp.mockImplementationOnce(() => Promise.reject(new Error('err')));
      return api.request({}).then(response => {
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
      return api.request(mockConfig).then(response => {
        expect(mockHttp).toHaveBeenCalledWith(expectedConfig);
        expect(response).toEqual(mockFinalResponse);
      });
    });
  });

  describe('request builders', () => {
    const testUrl = 'url';
    beforeEach(() => {
      api = new AvApi(mockHttp, Promise, {});
      api.request = jest.fn();
      api.cacheParams = jest.fn();
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
          },
        },
        config,
        { data }
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
          },
        },
        config,
        { data }
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
      api.remove(data, config);
      expect(api.getUrl).toHaveBeenLastCalledWith(expectedConfig, '');
      expect(api.request).toHaveBeenLastCalledWith(expectedConfig, undefined);
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
      api.beforeRemove = jest.fn(thisData => thisData);
      api.remove(data, config);
      expect(api.getUrl).toHaveBeenLastCalledWith(expectedConfig, '');
      expect(api.request).toHaveBeenLastCalledWith(expectedConfig, undefined);
      expect(api.beforeRemove).toHaveBeenLastCalledWith(data);
    });
  });
});
