import AvFeatureManagementApi from '../featureManagement';

describe('AvFeatureManagementApi', () => {
  let api;

  beforeEach(() => {
    api = new AvFeatureManagementApi();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('should be defined', () => {
    expect(api).toBeDefined();
  });

  test('userPermissionsConfig url should be correct', () => {
    expect(api.userPermissionsConfig().url).toBe('/cloud/web/appl/feature-management/legacy/v1/user-permissions');
  });

  test('afterQuery should return axiUserPermissions or []', () => {
    expect(api.afterQuery({})).toEqual([]);
    expect(api.afterQuery()).toEqual([]);
    expect(api.afterQuery({ data: { axiUserPermissions: ['x'] } })).toEqual(['x']);
  });

  test('getPermissions should call request with method GET and correct params', async () => {
    api.request = vi.fn().mockResolvedValue([]);

    await api.getPermissions('perm-1', 'FL');

    const [cfg] = api.request.mock.calls[0];
    expect(cfg.method).toBe('GET');
    expect(cfg.params).toEqual({ permissionId: 'perm-1', region: 'FL' });
    expect(cfg.url).toBe('/cloud/web/appl/feature-management/legacy/v1/user-permissions');
  });

  test('hasPermission should return true when permission has organizations', async () => {
    api.getPermissions = vi.fn().mockResolvedValue([{ id: 'perm-1', organizations: [{ id: 'org-1' }] }]);

    const result = await api.hasPermission('perm-1', 'FL');

    expect(api.getPermissions).toHaveBeenCalledWith('perm-1', 'FL');
    expect(result).toBe(true);
  });

  test('hasPermission should return false when permission has no organizations', async () => {
    api.getPermissions = vi.fn().mockResolvedValue([{ id: 'perm-1', organizations: [] }]);

    const result = await api.hasPermission('perm-1', 'FL');

    expect(result).toBe(false);
  });

  test('hasPermission should return false when permission is not present', async () => {
    api.getPermissions = vi.fn().mockResolvedValue([]);

    const result = await api.hasPermission('perm-1', 'FL');

    expect(result).toBe(false);
  });

  test('getAuthorizedOrganizations should return the matching permission organizations', async () => {
    const orgs = [{ id: 'org-1' }, { id: 'org-2' }];
    api.getPermissions = vi.fn().mockResolvedValue([{ id: 'perm-1', organizations: orgs }]);

    const result = await api.getAuthorizedOrganizations('perm-1', 'FL');

    expect(api.getPermissions).toHaveBeenCalledWith('perm-1', 'FL');
    expect(result).toEqual(orgs);
  });

  test('getAuthorizedOrganizations should return [] when no match is found', async () => {
    api.getPermissions = vi.fn().mockResolvedValue([{ id: 'other', organizations: [{ id: 'x' }] }]);

    const result = await api.getAuthorizedOrganizations('perm-1', 'FL');

    expect(result).toEqual([]);
  });
});
