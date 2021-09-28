import AvPermissionsApi from '../permissions';

describe('AvPermissionsApi', () => {
  let api;
  beforeEach(() => {
    api = new AvPermissionsApi();
  });

  test('should be defined', () => {
    expect(api).toBeDefined();
  });

  test('url should be correct', () => {
    expect(api.getUrl(api.config())).toBe('/api/sdk/platform/v1/permissions');
  });

  test('getPermissions() should query with permissionId and region params from arguments', async () => {
    api.query = jest.fn();

    const id = 'testPermissionId';
    const region = 'testRegion';
    const expectedConfig = { params: { id, region } };

    await api.getPermissions(id, region);
    expect(api.query).toHaveBeenLastCalledWith(expectedConfig);
  });
});
