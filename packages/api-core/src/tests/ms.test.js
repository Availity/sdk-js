import AvMicroservice from '../ms';
import API_OPTIONS from '../options';

const mockHttp = jest.fn(() => Promise.resolve({}));
const defaultPath = API_OPTIONS.MS.path;

describe('AvMicroservice', () => {
  let ms;

  test('should be defined', () => {
    ms = new AvMicroservice({ http: mockHttp });
    expect(ms).toBeDefined();
  });

  test('should throw errors when missing paramaters', () => {
    expect(() => {
      ms = new AvMicroservice();
    }).toThrow('[config] must be defined');

    expect(() => {
      ms = new AvMicroservice({ http: false });
    }).toThrow('[http] must be defined');

    expect(() => {
      ms = new AvMicroservice({});
    }).toThrow('[http] must be defined');
  });

  test('config() should be API_OPTIONS_MS default', () => {
    ms = new AvMicroservice({ http: mockHttp });
    const testExpectConfig = API_OPTIONS.MS;
    expect(ms.config({})).toEqual(testExpectConfig);
  });

  test('should default to withCredentials set to true', () => {
    ms = new AvMicroservice({ http: mockHttp });
    expect(ms.defaultConfig.withCredentials).toBeTruthy();
  });

  describe('getUrl', () => {
    const mockFinalResponse = 'finalResponse';
    beforeEach(() => {
      ms = new AvMicroservice({ http: mockHttp });
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

    test('get() throws error without id', async () => {
      const config = {
        testValue: 'test',
      };
      const id = false;
      await expect(ms.get(id, config)).rejects.toThrow('called method without [id]');
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
