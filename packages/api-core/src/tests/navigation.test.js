/* global jest, describe, test, expect */

import {AvNavigation} from '../index';
import {API_OPTIONS} from '../defaultOptions';

const defaultOptions = Object.assign({}, API_OPTIONS, {
  path: 'api/sdk/platform',
  name: 'navigation/spaces'
});

const mockHttp = jest.fn(() => {
  return Promise.resolve({});
});

describe('AvNavigation', () => {
  let TestApi;

  test('AvNavigation should be defined', () => {
    TestApi = new AvNavigation(mockHttp, Promise, {});
    expect(TestApi).toBeDefined();
  });

  test('AvNavigation should handle no config passed in', () => {
    TestApi = new AvNavigation(mockHttp, Promise);
    expect(TestApi).toBeDefined();
  });

  test('AvNavigation should merge its config with passed in config', () => {
    TestApi = new AvNavigation(mockHttp, Promise, {});
    expect(TestApi.defaultConfig).toEqual(defaultOptions);

    const testConfig = { name: 'testName' };
    const testExpect = Object.assign({}, defaultOptions, testConfig);
    TestApi = new AvNavigation(mockHttp, Promise, testConfig);
    expect(TestApi.defaultConfig).toEqual(testExpect);
  });

});
