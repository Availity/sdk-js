/* global jest, describe, test, expect */

import { AvProxy } from '../index';
import { API_OPTIONS } from '../defaultOptions';

const mockHttp = jest.fn(() => Promise.resolve({}));

const mockTenant = 'mockTenant';
function mockConfig(config = {}) {
  return Object.assign(
    {
      tenant: mockTenant,
    },
    config
  );
}
function defaultOptions(config) {
  const useConfig = mockConfig(config);
  return Object.assign(
    {},
    API_OPTIONS,
    {
      path: `api/v1/proxy/${useConfig.tenant}`,
      version: '',
    },
    useConfig
  );
}

describe('AvProxy', () => {
  let TestApi;

  test('AvProxy should be defined', () => {
    TestApi = new AvProxy(mockHttp, Promise, mockConfig());
    expect(TestApi).toBeDefined();
  });

  test('AvProxy should throw an error if config does not have tenant', () => {
    expect(() => {
      TestApi = new AvProxy(mockHttp, Promise);
    }).toThrow('Must specify tenant name for Proxy');
  });

  test('AvProxy should merge its config with passed in config', () => {
    TestApi = new AvProxy(mockHttp, Promise, mockConfig());
    expect(TestApi.defaultConfig).toEqual(defaultOptions());

    const testConfig = { name: 'testName' };
    TestApi = new AvProxy(mockHttp, Promise, mockConfig(testConfig));
    expect(TestApi.defaultConfig).toEqual(defaultOptions(testConfig));
  });
});
