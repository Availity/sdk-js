import AvUserPermissions from '../userPermissions';

const mockHttp = jest.fn(() => Promise.resolve({}));

describe('AvUserPermissions', () => {
  let api;

  test('should be defined', () => {
    api = new AvUserPermissions({ http: mockHttp });
    expect(api).toBeDefined();
  });

  test('should handle no config passed in', () => {
    api = new AvUserPermissions({
      http: mockHttp,
      promise: Promise,
    });
    expect(api).toBeDefined();
  });

  test('afterQuery should return response.data.axiUserPermissions if it exists or an empty array', () => {
    api = new AvUserPermissions({ http: mockHttp });
    const testResponse1 = {};
    const axiUserPermissions = ['testPermission'];
    const testResponse2 = {
      data: {
        axiUserPermissions,
      },
    };
    expect(api.afterQuery(testResponse1)).toEqual([]);
    expect(api.afterQuery(testResponse2)).toEqual(axiUserPermissions);
  });

  test('getPermissions should query with permissionId and region params from arguments', () => {
    api = new AvUserPermissions({ http: mockHttp });
    api.query = jest.fn();
    const permissionId = 'testPermissionId';
    const region = 'testRegion';
    const expectedConfig = { params: { permissionId, region } };
    api.getPermissions(permissionId, region);
    expect(api.query).toHaveBeenLastCalledWith(expectedConfig);
  });
});
