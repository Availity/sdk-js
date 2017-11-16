/* global jest, describe, test, expect */

import { AvSpaces } from '../index';
import { API_OPTIONS } from '../defaultOptions';

const defaultOptions = Object.assign({}, API_OPTIONS, {
  path: 'api/sdk/platform',
  name: 'spaces',
});

const mockHttp = jest.fn(() => Promise.resolve({}));

describe('AvSpaces', () => {
  let TestApi;

  test('AvSpaces should be defined', () => {
    TestApi = new AvSpaces(mockHttp, Promise, {});
    expect(TestApi).toBeDefined();
  });

  test('AvSpaces should handle no config passed in', () => {
    TestApi = new AvSpaces(mockHttp, Promise);
    expect(TestApi).toBeDefined();
  });

  test('AvSpaces should merge its config with passed in config', () => {
    TestApi = new AvSpaces(mockHttp, Promise, {});
    expect(TestApi.defaultConfig).toEqual(defaultOptions);

    const testConfig = { name: 'testName' };
    const testExpect = Object.assign({}, defaultOptions, testConfig);
    TestApi = new AvSpaces(mockHttp, Promise, testConfig);
    expect(TestApi.defaultConfig).toEqual(testExpect);
  });
});
