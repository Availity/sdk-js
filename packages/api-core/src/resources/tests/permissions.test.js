import AvPermissions from '../permissions';

const mockHttp = vi.fn(() => Promise.resolve({}));

describe('AvPermissions', () => {
  let api;

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('should be defined', () => {
    api = new AvPermissions({ http: mockHttp });
    expect(api).toBeDefined();
  });

  test('should handle no config passed in', () => {
    api = new AvPermissions({
      http: mockHttp,
      promise: Promise,
    });
    expect(api).toBeDefined();
  });

  test('getPermissions() should query with permissionId and region params from arguments', () => {
    api = new AvPermissions({ http: mockHttp });
    api.query = vi.fn();
    const id = 'testPermissionId';
    const region = 'testRegion';
    const expectedConfig = { params: { id, region } };
    api.getPermissions(id, region);
    expect(api.query).toHaveBeenLastCalledWith(expectedConfig);
  });
});
