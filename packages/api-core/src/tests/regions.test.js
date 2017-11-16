/* global jest, describe, test, expect */

import { AvRegions } from '../index';
import { API_OPTIONS } from '../defaultOptions';

const defaultOptions = Object.assign({}, API_OPTIONS, {
  path: 'api/sdk/platform',
  name: 'regions',
  sessionBust: false,
  pageBust: true,
});

const mockHttp = jest.fn(() => Promise.resolve({}));

const mockUser = {
  id: 'mockUserId',
};
const mockAvUsers = {
  me: jest.fn(() => Promise.resolve(mockUser)),
};

describe('AvRegions', () => {
  let TestApi;

  test('AvRegions should be defined', () => {
    TestApi = new AvRegions(mockHttp, Promise, mockAvUsers, {});
    expect(TestApi).toBeDefined();
  });

  test('AvRegions should handle no config passed in', () => {
    TestApi = new AvRegions(mockHttp, Promise);
    expect(TestApi).toBeDefined();
  });

  test('AvRegions should merge its config with passed in config', () => {
    TestApi = new AvRegions(mockHttp, Promise, mockAvUsers, {});
    expect(TestApi.defaultConfig).toEqual(defaultOptions);

    const testConfig = { name: 'testName' };
    const testExpect = Object.assign({}, defaultOptions, testConfig);
    TestApi = new AvRegions(mockHttp, Promise, mockAvUsers, testConfig);
    expect(TestApi.defaultConfig).toEqual(testExpect);
  });

  test('afterGet should return response.data.regions if it exists or an empty array', () => {
    TestApi = new AvRegions(mockHttp, Promise, mockAvUsers);
    const testResponse1 = {};
    const regions = ['testOrg'];
    const testResponse2 = {
      data: {
        regions,
      },
    };
    expect(TestApi.afterGet(testResponse1)).toEqual([]);
    expect(TestApi.afterGet(testResponse2)).toEqual(regions);
  });

  test('afterUpdate should call setPageBust and return response', () => {
    TestApi = new AvRegions(mockHttp, Promise, mockAvUsers);
    TestApi.setPageBust = jest.fn();
    const testResponse1 = {};
    const regions = ['testRegion'];
    const testResponse2 = {
      data: {
        regions,
      },
    };
    expect(TestApi.afterUpdate(testResponse1)).toEqual(testResponse1);
    expect(TestApi.afterUpdate(testResponse2)).toEqual(testResponse2);
    expect(TestApi.setPageBust).toHaveBeenCalledTimes(2);
  });

  test('getRegions should call AvUsers.me() and then query with result', () => {
    TestApi = new AvRegions(mockHttp, Promise, mockAvUsers);
    TestApi.query = jest.fn();

    const testConfig = { name: 'testName' };
    const expectedConfig = Object.assign(
      {},
      { params: { userId: mockUser.id } },
      testConfig
    );

    return TestApi.getRegions(testConfig).then(() => {
      expect(TestApi.query).toHaveBeenLastCalledWith(expectedConfig);
    });
  });

  test('getCurrent region should query with param currentlySelected: true', () => {
    TestApi = new AvRegions(mockHttp, Promise, mockAvUsers);
    TestApi.query = jest.fn();
    const expectedConfig = {
      params: {
        currentlySelected: true,
      },
    };
    TestApi.getCurrentRegion();
    expect(TestApi.query).toHaveBeenLastCalledWith(expectedConfig);
  });
});
