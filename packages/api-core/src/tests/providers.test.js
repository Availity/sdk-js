/* global jest, describe, test, expect */

import { AvProviders } from '../index';
import { API_OPTIONS } from '../defaultOptions';

const defaultOptions = Object.assign({}, API_OPTIONS, {
  path: 'api/internal',
  name: 'providers',
});

const mockHttp = jest.fn(() => Promise.resolve({}));

describe('AvProviders', () => {
  let TestApi;

  test('AvProviders should be defined', () => {
    TestApi = new AvProviders(mockHttp, Promise, {});
    expect(TestApi).toBeDefined();
  });

  test('AvProviders should handle no config passed in', () => {
    TestApi = new AvProviders(mockHttp, Promise);
    expect(TestApi).toBeDefined();
  });

  test('AvProviders should merge its config with passed in config', () => {
    TestApi = new AvProviders(mockHttp, Promise, {});
    expect(TestApi.defaultConfig).toEqual(defaultOptions);

    const testConfig = { name: 'testName' };
    const testExpect = Object.assign({}, defaultOptions, testConfig);
    TestApi = new AvProviders(mockHttp, Promise, testConfig);
    expect(TestApi.defaultConfig).toEqual(testExpect);
  });

  test('afterQuery should return response.data.providers if it exists or an empty array', () => {
    TestApi = new AvProviders(mockHttp, Promise);
    const testResponse1 = {};
    const providers = ['testProvider'];
    const testResponse2 = {
      data: {
        providers,
      },
    };
    expect(TestApi.afterQuery(testResponse1)).toEqual([]);
    expect(TestApi.afterQuery(testResponse2)).toEqual(providers);
  });

  test('getProviders should query with customerId param added', () => {
    TestApi = new AvProviders(mockHttp, Promise);
    TestApi.query = jest.fn();

    const customerId = 'testCustomerId';
    const testConfig = { name: 'testName' };
    const expectedConfig = Object.assign(
      {},
      { params: { customerId } },
      testConfig
    );

    TestApi.getProviders(customerId, testConfig);
    expect(TestApi.query).toHaveBeenLastCalledWith(expectedConfig);
  });
});
