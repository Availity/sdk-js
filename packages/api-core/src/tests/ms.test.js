import AvMicroservice from '../ms';
import API_OPTIONS from '../options';

const mockHttp = jest.fn(() => Promise.resolve({}));
const mockMerge = jest.fn((...args) => Object.assign(...args));
const defaultPath = API_OPTIONS.MS.path;

describe('AvMicroservice', () => {
  let ms;

  test('AvMicroservice should be defined', () => {
    ms = new AvMicroservice({
      http: mockHttp,
      promise: Promise,
      merge: mockMerge,
      config: {},
    });
    expect(ms).toBeDefined();
  });

  test('AvMicroservice should throw errors when missing paramaters', () => {
    // expect(() => {
    //   ms = new AvMicroservice();
    // }).toThrowError('[http], [promise], [config], and [merge] must be defined');

    expect(() => {
      ms = new AvMicroservice({
        http: false,
        promise: false,
        merge: false,
        config: false,
      });
    }).toThrowError('[http], [promise], [config], and [merge] must be defined');

    expect(() => {
      ms = new AvMicroservice({
        http: false,
        promise: Promise,
        merge: mockMerge,
        config: {},
      });
    }).toThrowError('[http], [promise], [config], and [merge] must be defined');

    expect(() => {
      ms = new AvMicroservice({
        http: mockHttp,
        promise: false,
        merge: mockMerge,
        config: {},
      });
    }).toThrowError('[http], [promise], [config], and [merge] must be defined');

    expect(() => {
      ms = new AvMicroservice({
        http: mockHttp,
        promise: Promise,
        merge: false,
        config: {},
      });
    }).toThrowError('[http], [promise], [config], and [merge] must be defined');

    expect(() => {
      ms = new AvMicroservice({
        http: mockHttp,
        promise: Promise,
        merge: mockMerge,
        config: false,
      });
    }).toThrowError('[http], [promise], [config], and [merge] must be defined');
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

  describe('getUrl', () => {
    beforeEach(() => {
      ms = new AvMicroservice({
        http: mockHttp,
        promise: Promise,
        merge: mockMerge,
        config: {},
      });
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
  });
});
