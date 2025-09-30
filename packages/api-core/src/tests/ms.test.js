import AvMicroservice from '../ms';
import API_OPTIONS from '../options';

const mockHttp = jest.fn(() => Promise.resolve({}));
const mockMerge = jest.fn((...args) => Object.assign(...args));
const defaultPath = API_OPTIONS.MS.path;

describe('AvMicroservice', () => {
  let ms;

  test('should be defined', () => {
    ms = new AvMicroservice({
      http: mockHttp,
      promise: Promise,
      merge: mockMerge,
      config: {},
    });
    expect(ms).toBeDefined();
  });

  test('should throw errors when missing paramaters', () => {
    // expect(() => {
    //   ms = new AvMicroservice();
    // }).toThrow('[http], [promise], [config], and [merge] must be defined');

    expect(() => {
      ms = new AvMicroservice({
        http: false,
        promise: false,
        merge: false,
        config: false,
      });
    }).toThrow('[http], [promise], [config], and [merge] must be defined');

    expect(() => {
      ms = new AvMicroservice({
        http: false,
        promise: Promise,
        merge: mockMerge,
        config: {},
      });
    }).toThrow('[http], [promise], [config], and [merge] must be defined');

    expect(() => {
      ms = new AvMicroservice({
        http: mockHttp,
        promise: false,
        merge: mockMerge,
        config: {},
      });
    }).toThrow('[http], [promise], [config], and [merge] must be defined');

    expect(() => {
      ms = new AvMicroservice({
        http: mockHttp,
        promise: Promise,
        merge: false,
        config: {},
      });
    }).toThrow('[http], [promise], [config], and [merge] must be defined');

    expect(() => {
      ms = new AvMicroservice({
        http: mockHttp,
        promise: Promise,
        merge: mockMerge,
        config: false,
      });
    }).toThrow('[http], [promise], [config], and [merge] must be defined');
  });

  test('config() should be API_OPTIONS_MS default', () => {
    ms = new AvMicroservice({
      http: mockHttp,
      promise: Promise,
      merge: mockMerge,
      config: {},
    });
    const testExpectConfig = API_OPTIONS.MS;
    expect(ms.config({})).toEqual(testExpectConfig);
  });

  test('should default to withCredentials set to true', () => {
    ms = new AvMicroservice({
      http: mockHttp,
      promise: Promise,
      merge: mockMerge,
      config: {},
    });
    expect(ms.defaultConfig.withCredentials).toBeTruthy();
  });

  describe('getUrl', () => {
    const mockFinalResponse = 'finalResponse';
    beforeEach(() => {
      ms = new AvMicroservice({
        http: mockHttp,
        promise: Promise,
        merge: mockMerge,
        config: {},
      });
      ms.onResponse = jest.fn(() => mockFinalResponse);
    });

    test('should return joined config.path and name if no config.id', () => {
      const testUrl = 'test';
      const testExpected = `${defaultPath}/${testUrl}`;
      const testConfig = {
        api: true,
        name: testUrl,
      };
      expect(ms.getUrl(testConfig)).toBe(testExpected);
    });

    test('get() throws error without id', () => {
      const config = {
        testValue: 'test',
      };
      const id = false;
      expect(() => {
        ms.get(id, config);
      }).toThrow('called method without [id]');
    });

    test('get() should build url with id', async () => {
      await ms.get(1);
      expect(mockHttp.mock.calls[0][0].url).toBe('/ms/api/availity/internal/1');
    });

    test('should return joined config.path, name, and id', () => {
      const testUrl = 'test';
      const testId = 'testId';
      const testExpected = `${defaultPath}/${testUrl}/${testId}`;
      const testConfig = {
        api: true,
        name: testUrl,
      };
      expect(ms.getUrl(testConfig, testId)).toBe(testExpected);
    });

    test("should remove multiple and trailing /'s", () => {
      const testConfig = {
        api: true,
        path: '/api/',
        name: '/test/',
      };
      const testExpected = '/api/test';
      expect(ms.getUrl(testConfig)).toBe(testExpected);
    });

    test('should return full URL when host is specified', () => {
      const testUrl = 'https://apps.availity.com/api/v1/test';
      const testConfig = {
        api: true,
        path: '/api/',
        version: '/v1/',
        name: '/test',
        host: 'apps.availity.com',
      };
      expect(ms.getUrl(testConfig)).toBe(testUrl);
    });

    test('should return cloud URL when host is specified', () => {
      const testUrl = 'https://digital.awp.availity.com/api/v1/test';
      const testConfig = {
        api: true,
        path: '/api/',
        version: '/v1/',
        name: '/test',
        host: 'digital.awp.availity.com',
      };
      expect(ms.getUrl(testConfig)).toBe(testUrl);
    });

    test('should return apps when location is prod cloud', () => {
      const testUrl = 'https://apps.availity.com/api/v1/test';
      const testConfig = {
        api: true,
        path: '/api/',
        version: '/v1/',
        name: '/test',
        window: {
          location: {
            hostname: 'digital.awp.availity.com',
            pathname: '/cdn/prd/spaces/index.html',
          },
        },
      };

      expect(ms.getUrl(testConfig)).toBe(testUrl);
    });

    test('should return test-apps when location is tst cloud', () => {
      const testUrl = 'https://test-apps.availity.com/api/v1/test';
      const testConfig = {
        api: true,
        path: '/api/',
        version: '/v1/',
        name: '/test',
        window: {
          location: {
            hostname: 'digital.awn.availity.com',
            pathname: '/cdn/tst/spaces/index.html',
          },
        },
      };

      expect(ms.getUrl(testConfig)).toBe(testUrl);
    });

    test('should return qa-apps when location is stg cloud', () => {
      const testUrl = 'https://qa-apps.availity.com/api/v1/test';
      const testConfig = {
        api: true,
        path: '/api/',
        version: '/v1/',
        name: '/test',
        window: {
          location: {
            hostname: 'digital.awn.availity.com',
            pathname: '/cdn/stg/spaces/index.html',
          },
        },
      };

      expect(ms.getUrl(testConfig)).toBe(testUrl);
    });

    test('should return t01-apps when location is t01 cloud', () => {
      const testUrl = 'https://t01-apps.availity.com/api/v1/test';
      const testConfig = {
        api: true,
        path: '/api/',
        version: '/v1/',
        name: '/test',
        window: {
          location: {
            hostname: 'digital.awn.availity.com',
            pathname: '/cdn/t01/spaces/index.html',
          },
        },
      };

      expect(ms.getUrl(testConfig)).toBe(testUrl);
    });

    test('should return relative URL when location host is prod cloud but path is non-prod', () => {
      const testUrl = '/api/v1/test';
      const testConfig = {
        api: true,
        path: '/api/',
        version: '/v1/',
        name: '/test',
        window: {
          location: {
            hostname: 'digital.awp.availity.com',
            pathname: '/cdn/tst/spaces/index.html',
          },
        },
      };

      expect(ms.getUrl(testConfig)).toBe(testUrl);
    });

    test('should return relative URL when location host is non-prod cloud but path is prod', () => {
      const testUrl = '/api/v1/test';
      const testConfig = {
        api: true,
        path: '/api/',
        version: '/v1/',
        name: '/test',
        window: {
          location: {
            hostname: 'digital.awn.availity.com',
            pathname: '/cdn/prd/spaces/index.html',
          },
        },
      };

      expect(ms.getUrl(testConfig)).toBe(testUrl);
    });
  });
});
