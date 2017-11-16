/* global jest, describe, test, expect */

import { AvUserPermissions } from '../index';
import { API_OPTIONS } from '../defaultOptions';

const defaultOptions = Object.assign({}, API_OPTIONS, {
  path: 'api/internal',
  name: 'axi-user-permissions',
});

const mockHttp = jest.fn(() => Promise.resolve({}));

describe('AvUserPermissions', () => {
  let TestApi;

  test('AvUserPermissions should be defined', () => {
    TestApi = new AvUserPermissions(mockHttp, Promise, {});
    expect(TestApi).toBeDefined();
  });

  test('AvUserPermissions should handle no config passed in', () => {
    TestApi = new AvUserPermissions(mockHttp, Promise);
    expect(TestApi).toBeDefined();
  });

  test('AvUserPermissions should merge its config with passed in config', () => {
    TestApi = new AvUserPermissions(mockHttp, Promise, {});
    expect(TestApi.defaultConfig).toEqual(defaultOptions);

    const testConfig = { name: 'testName' };
    const testExpect = Object.assign({}, defaultOptions, testConfig);
    TestApi = new AvUserPermissions(mockHttp, Promise, testConfig);
    expect(TestApi.defaultConfig).toEqual(testExpect);
  });

  test('afterQuery should return response.data.axiUserPermissions if it exists or an empty array', () => {
    TestApi = new AvUserPermissions(mockHttp, Promise);
    const testResponse1 = {};
    const axiUserPermissions = ['testPermission'];
    const testResponse2 = {
      data: {
        axiUserPermissions,
      },
    };
    expect(TestApi.afterQuery(testResponse1)).toEqual([]);
    expect(TestApi.afterQuery(testResponse2)).toEqual(axiUserPermissions);
  });

  test('getPermissions should query with permissionId and region params from arguments', () => {
    TestApi = new AvUserPermissions(mockHttp, Promise);
    TestApi.query = jest.fn();
    const permissionId = 'testPermissionId';
    const region = 'testRegion';
    const expectedConfig = { params: { permissionId, region } };
    TestApi.getPermissions(permissionId, region);
    expect(TestApi.query).toHaveBeenLastCalledWith(expectedConfig);
  });
});
