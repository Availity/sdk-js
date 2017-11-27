import { AvUsers } from '../index';

const mockHttp = jest.fn(() => Promise.resolve({}));

describe('AvUsers', () => {
  let TestApi;

  test('AvUsers should be defined', () => {
    TestApi = new AvUsers(mockHttp, Promise, {});
    expect(TestApi).toBeDefined();
  });

  test('AvUsers should handle no config passed in', () => {
    TestApi = new AvUsers(mockHttp, Promise);
    expect(TestApi).toBeDefined();
  });

  test('afterGet should return response.data.user if it exists or an empty object', () => {
    TestApi = new AvUsers(mockHttp, Promise);
    const testResponse1 = {};
    const user = ['testUser'];
    const testResponse2 = {
      data: {
        user,
      },
    };
    expect(TestApi.afterGet(testResponse1)).toEqual({});
    expect(TestApi.afterGet(testResponse2)).toEqual(user);
  });

  test("me() should get with id 'me'", () => {
    TestApi = new AvUsers(mockHttp, Promise);
    TestApi.get = jest.fn();
    TestApi.me();
    expect(TestApi.get).toHaveBeenLastCalledWith('me', undefined);
    const testConfig = { name: 'testName' };
    TestApi.me(testConfig);
    expect(TestApi.get).toHaveBeenLastCalledWith('me', testConfig);
  });
});
