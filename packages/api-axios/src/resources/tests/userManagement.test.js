import AvUserManagementApi from '../userManagement';

describe('AvUserManagementApi', () => {
  let api;

  beforeEach(() => {
    api = new AvUserManagementApi();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('should be defined', () => {
    expect(api).toBeDefined();
  });

  test('usersConfig url should be correct for me', () => {
    expect(api.usersConfig('me').url).toBe('/cloud/web/appl/user-management/legacy/sdk/platform/v1/users/me');
  });

  test('usersConfig url should include akaName when provided', () => {
    expect(api.usersConfig('jsmith').url).toBe('/cloud/web/appl/user-management/legacy/sdk/platform/v1/users/jsmith');
  });

  test('me should call request with method GET and me url', async () => {
    api.request = vi.fn().mockResolvedValue({});

    await api.me();

    const [cfg] = api.request.mock.calls[0];
    expect(cfg.method).toBe('GET');
    expect(cfg.url).toBe('/cloud/web/appl/user-management/legacy/sdk/platform/v1/users/me');
  });

  test('getMe should return response.data', async () => {
    const user = { id: 'user-1', akaname: 'jsmith' };
    api.me = vi.fn().mockResolvedValue({ data: user });

    const result = await api.getMe();

    expect(api.me).toHaveBeenCalledTimes(1);
    expect(result).toEqual(user);
  });

  test('getUserId should return the user id', async () => {
    api.getMe = vi.fn().mockResolvedValue({ id: 'user-1' });

    const result = await api.getUserId();

    expect(result).toBe('user-1');
  });

  test('getAkaName should return the user akaname', async () => {
    api.getMe = vi.fn().mockResolvedValue({ akaname: 'jsmith' });

    const result = await api.getAkaName();

    expect(result).toBe('jsmith');
  });

  test('getCurrentRegion should return the user currentRegion', async () => {
    api.getMe = vi.fn().mockResolvedValue({ currentRegion: 'FL' });

    const result = await api.getCurrentRegion();

    expect(result).toBe('FL');
  });
});
