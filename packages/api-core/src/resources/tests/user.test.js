import AvUsers from '../user';

const mockPromise = jest.fn(() => Promise.resolve({}));

describe('AvUsers', () => {
  let api;

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should be defined', () => {
    api = new AvUsers({ http: mockPromise });
    expect(api).toBeDefined();
  });

  test('should handle no config passed in', () => {
    api = new AvUsers({
      http: mockPromise,
      promise: Promise,
    });
    expect(api).toBeDefined();
  });

  test("me() should get with id 'me' and return response.data", async () => {
    api = new AvUsers({ http: mockPromise });
    const userData = { id: '123', name: 'Test User' };
    api.get = jest.fn(() => Promise.resolve({ data: userData }));

    const result = await api.me();
    expect(api.get).toHaveBeenLastCalledWith('me', undefined);
    expect(result).toEqual(userData);

    const testConfig = { name: 'testName' };
    const result2 = await api.me(testConfig);
    expect(api.get).toHaveBeenLastCalledWith('me', testConfig);
    expect(result2).toEqual(userData);
  });
});
