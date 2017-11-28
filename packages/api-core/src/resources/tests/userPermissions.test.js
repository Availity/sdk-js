import AvUserPermissions from '../userPermissions';

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
