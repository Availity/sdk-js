import AvPermissions from '../permissions';

const mockHttp = jest.fn(() => Promise.resolve({}));

describe('AvPermissions', () => {
  let api;

  afterEach(() => {
    jest.clearAllMocks();
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
    api.query = jest.fn();
    const id = 'testPermissionId';
    const region = 'testRegion';
    const expectedConfig = { params: { id, region } };
    api.getPermissions(id, region);
    expect(api.query).toHaveBeenLastCalledWith(expectedConfig);
  });
});
