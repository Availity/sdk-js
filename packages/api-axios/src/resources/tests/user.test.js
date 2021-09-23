import AvUserApi from '../user';

describe('AvUserApi', () => {
  let api;
  beforeEach(() => {
    api = new AvUserApi();
  });

  test('should be defined', () => {
    expect(api).toBeDefined();
  });

  test('url should be correct', () => {
    expect(api.getUrl(api.config())).toBe('/api/sdk/platform/v1/users');
  });

  test("me() should get with id 'me'", async () => {
    api.get = jest.fn(async () => new Promise((resolve) => resolve({ id: 'test' })));

    await api.me();
    expect(api.get).toHaveBeenLastCalledWith('me', undefined);

    const testConfig = { name: 'testName' };
    await api.me(testConfig);
    expect(api.get).toHaveBeenLastCalledWith('me', testConfig);
  });
});
