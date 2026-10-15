import AvUserManagement from '../userManagement';

const mockHttp = vi.fn(() => Promise.resolve({}));

const USERS_URL = '/cloud/web/appl/user-management/legacy/sdk/platform/v1/users';

describe('AvUserManagement', () => {
  let api;

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('should be defined', () => {
    api = new AvUserManagement({ http: mockHttp });
    expect(api).toBeDefined();
  });

  test('should handle no extra config passed in', () => {
    api = new AvUserManagement({ http: mockHttp, promise: Promise });
    expect(api).toBeDefined();
  });

  test('usersConfig should build the users/me url', () => {
    api = new AvUserManagement({ http: mockHttp });
    expect(api.usersConfig('me').url).toBe(`${USERS_URL}/me`);
  });

  test('usersConfig should build the base users url with no id', () => {
    api = new AvUserManagement({ http: mockHttp });
    expect(api.usersConfig().url).toBe(USERS_URL);
  });

  test('me should call request with GET and the users/me url', () => {
    api = new AvUserManagement({ http: mockHttp });
    api.request = vi.fn();

    api.me();

    expect(api.request).toHaveBeenCalledTimes(1);
    const [cfg, callback] = api.request.mock.calls[0];
    expect(cfg.method).toBe('GET');
    expect(cfg.url).toBe(`${USERS_URL}/me`);
    expect(callback).toBe(api.afterGet);
  });

  test('getUser should call request with GET and the akaName url', () => {
    api = new AvUserManagement({ http: mockHttp });
    api.request = vi.fn();

    api.getUser('testAka');

    const [cfg] = api.request.mock.calls[0];
    expect(cfg.method).toBe('GET');
    expect(cfg.url).toBe(`${USERS_URL}/testAka`);
  });

  test('getMe should return response.data', async () => {
    api = new AvUserManagement({ http: mockHttp });
    const user = { id: '123', akaname: 'testAka', currentRegion: 'FL' };
    api.me = vi.fn(() => Promise.resolve({ data: user }));

    await expect(api.getMe()).resolves.toEqual(user);
    expect(api.me).toHaveBeenCalledTimes(1);
  });

  test('getUserId should return user.id', async () => {
    api = new AvUserManagement({ http: mockHttp });
    api.getMe = vi.fn(() => Promise.resolve({ id: '123', akaname: 'testAka' }));

    await expect(api.getUserId()).resolves.toBe('123');
  });

  test('getAkaName should return user.akaname', async () => {
    api = new AvUserManagement({ http: mockHttp });
    api.getMe = vi.fn(() => Promise.resolve({ id: '123', akaname: 'testAka' }));

    await expect(api.getAkaName()).resolves.toBe('testAka');
  });

  test('getCurrentRegion should return user.currentRegion', async () => {
    api = new AvUserManagement({ http: mockHttp });
    api.getMe = vi.fn(() => Promise.resolve({ id: '123', currentRegion: 'FL' }));

    await expect(api.getCurrentRegion()).resolves.toBe('FL');
  });

  test('getUserId should resolve undefined when getMe resolves undefined', async () => {
    api = new AvUserManagement({ http: mockHttp });
    api.getMe = vi.fn(() => Promise.resolve(undefined));

    await expect(api.getUserId()).resolves.toBeUndefined();
  });
});
