import AvFeatureManagement from '../featureManagement';

const mockHttp = vi.fn(() => Promise.resolve({}));

describe('AvFeatureManagement', () => {
  let api;

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('should be defined', () => {
    api = new AvFeatureManagement({ http: mockHttp });
    expect(api).toBeDefined();
  });

  test('should handle no extra config passed in', () => {
    api = new AvFeatureManagement({ http: mockHttp, promise: Promise });
    expect(api).toBeDefined();
  });

  test('userPermissionsConfig should build the user-permissions url', () => {
    api = new AvFeatureManagement({ http: mockHttp });
    const cfg = api.userPermissionsConfig();
    expect(cfg.url).toBe('/cloud/web/appl/feature-management/legacy/v1/user-permissions');
    expect(cfg.name).toBe('legacy/v1/user-permissions');
    expect(typeof cfg.paramsSerializer).toBe('function');
  });

  test('afterQuery should return response.data.axiUserPermissions if it exists or an empty array', () => {
    api = new AvFeatureManagement({ http: mockHttp });
    const axiUserPermissions = ['testPermission'];
    expect(api.afterQuery({})).toEqual([]);
    expect(api.afterQuery(undefined)).toEqual([]);
    expect(api.afterQuery({ data: { axiUserPermissions } })).toEqual(axiUserPermissions);
  });

  test('getPermissions should call request with GET and permissionId/region params', () => {
    api = new AvFeatureManagement({ http: mockHttp });
    api.request = vi.fn();
    const permissionId = 'testPermissionId';
    const region = 'testRegion';

    api.getPermissions(permissionId, region);

    expect(api.request).toHaveBeenCalledTimes(1);
    const [cfg, callback] = api.request.mock.calls[0];
    expect(cfg.method).toBe('GET');
    expect(cfg.params).toEqual({ permissionId, region });
    expect(cfg.url).toBe('/cloud/web/appl/feature-management/legacy/v1/user-permissions');
    expect(typeof callback).toBe('function');
  });

  test('hasPermission should resolve true when a matching permission has organizations', async () => {
    api = new AvFeatureManagement({ http: mockHttp });
    api.getPermissions = vi.fn(() => Promise.resolve([{ id: 'perm1', organizations: [{ id: 'org1' }] }]));

    await expect(api.hasPermission('perm1', 'FL')).resolves.toBe(true);
    expect(api.getPermissions).toHaveBeenCalledWith('perm1', 'FL');
  });

  test('hasPermission should resolve false when permission is missing or has no organizations', async () => {
    api = new AvFeatureManagement({ http: mockHttp });

    api.getPermissions = vi.fn(() => Promise.resolve([{ id: 'perm1', organizations: [] }]));
    await expect(api.hasPermission('perm1')).resolves.toBe(false);

    api.getPermissions = vi.fn(() => Promise.resolve([{ id: 'other', organizations: [{ id: 'org1' }] }]));
    await expect(api.hasPermission('perm1')).resolves.toBe(false);
  });

  test('hasPermission should handle a raw response shape with data.axiUserPermissions', async () => {
    api = new AvFeatureManagement({ http: mockHttp });
    api.getPermissions = vi.fn(() =>
      Promise.resolve({ data: { axiUserPermissions: [{ id: 'perm1', organizations: [{ id: 'org1' }] }] } })
    );
    await expect(api.hasPermission('perm1')).resolves.toBe(true);
  });

  test('getAuthorizedOrganizations should resolve the organizations of the matching permission', async () => {
    api = new AvFeatureManagement({ http: mockHttp });
    const organizations = [{ id: 'org1' }, { id: 'org2' }];
    api.getPermissions = vi.fn(() => Promise.resolve([{ id: 'perm1', organizations }]));

    await expect(api.getAuthorizedOrganizations('perm1', 'FL')).resolves.toEqual(organizations);
    expect(api.getPermissions).toHaveBeenCalledWith('perm1', 'FL');
  });

  test('getAuthorizedOrganizations should resolve an empty array when no permission matches', async () => {
    api = new AvFeatureManagement({ http: mockHttp });
    api.getPermissions = vi.fn(() => Promise.resolve([{ id: 'other', organizations: [{ id: 'org1' }] }]));

    await expect(api.getAuthorizedOrganizations('perm1')).resolves.toEqual([]);
  });
});
