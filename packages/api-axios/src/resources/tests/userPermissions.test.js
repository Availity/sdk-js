import AvUserPermissionsApi from '../userPermissions';

describe('AvUserPermissionsApi', () => {
  let api;
  beforeEach(() => {
    api = new AvUserPermissionsApi();
  });

  test('should be defined', () => {
    expect(api).toBeDefined();
  });

  test('url should be correct', () => {
    expect(api.getUrl(api.config())).toBe('/api/internal/v1/axi-user-permissions');
  });

  test('afterQuery should return response.data.axiUserPermissions if it exists or an empty array', () => {
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

  test('getPermissions should query with permissionId and region params from arguments', async () => {
    api.query = jest.fn();

    const permissionId = 'testPermissionId';
    const region = 'testRegion';
    const expectedConfig = { params: { permissionId, region } };

    await api.getPermissions(permissionId, region);
    expect(api.query).toHaveBeenLastCalledWith(expectedConfig);
  });
});
