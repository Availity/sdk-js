import AvUsers from '../user';

const mockHttp = jest.fn(() => Promise.resolve({}));

describe('AvUsers', () => {
  let api;

  test('should be defined', () => {
    api = new AvUsers(mockHttp, Promise, {});
    expect(api).toBeDefined();
  });

  test('should handle no config passed in', () => {
    api = new AvUsers(mockHttp, Promise);
    expect(api).toBeDefined();
  });

  test("me() should get with id 'me'", () => {
    api = new AvUsers(mockHttp, Promise);
    api.get = jest.fn();
    api.me();
    expect(api.get).toHaveBeenLastCalledWith('me', undefined);
    const testConfig = { name: 'testName' };
    api.me(testConfig);
    expect(api.get).toHaveBeenLastCalledWith('me', testConfig);
  });
});
