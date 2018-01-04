import AvUsers from '../user';

const mockPromise = jest.fn(() => Promise.resolve({}));
const mockMerge = jest.fn((...args) => Object.assign(...args));

describe('AvUsers', () => {
  let api;

  test('should be defined', () => {
    api = new AvUsers(mockPromise, Promise, mockMerge, {});
    expect(api).toBeDefined();
  });

  test('should handle no config passed in', () => {
    api = new AvUsers(mockPromise, Promise, mockMerge);
    expect(api).toBeDefined();
  });

  test("me() should get with id 'me'", () => {
    api = new AvUsers(mockPromise, Promise, mockMerge);
    api.get = mockPromise;
    api.me();
    expect(api.get).toHaveBeenLastCalledWith('me', undefined);
    const testConfig = { name: 'testName' };
    api.me(testConfig);
    expect(api.get).toHaveBeenLastCalledWith('me', testConfig);
  });
});
