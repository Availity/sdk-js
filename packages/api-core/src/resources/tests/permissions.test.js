import AvPermissions from '../permissions';

const mockHttp = jest.fn(() => Promise.resolve({}));

describe('AvPermissions', () => {
  let TestApi;

  test('AvPermissions should be defined', () => {
    TestApi = new AvPermissions(mockHttp, Promise, {});
    expect(TestApi).toBeDefined();
  });

  test('AvPermissions should handle no config passed in', () => {
    TestApi = new AvPermissions(mockHttp, Promise);
    expect(TestApi).toBeDefined();
  });

  test('afterQuery should return response.data.permissions if it exists or an empty array', () => {
    TestApi = new AvPermissions(mockHttp, Promise);
    const testResponse1 = {};
    const permissions = ['testPermission'];
    const testResponse2 = {
      data: {
        permissions,
      },
    };
    expect(TestApi.afterQuery(testResponse1)).toEqual([]);
    expect(TestApi.afterQuery(testResponse2)).toEqual(permissions);
  });

  test('getPermissions should query with permissionId and region params from arguments', () => {
    TestApi = new AvPermissions(mockHttp, Promise);
    TestApi.query = jest.fn();
    const id = 'testPermissionId';
    const region = 'testRegion';
    const expectedConfig = { params: { id, region } };
    TestApi.getPermissions(id, region);
    expect(TestApi.query).toHaveBeenLastCalledWith(expectedConfig);
  });
});
