import AvOrganizations from '../organizations';

const mockHttp = jest.fn(() => Promise.resolve({}));
const mockMerge = jest.fn((...args) => Object.assign(...args));

const mockUser = {
  id: 'mockUserId',
};
const mockAvUsers = {
  me: jest.fn(() => Promise.resolve(mockUser)),
};

describe('AvOrganizations', () => {
  let api;

  test('should be defined', () => {
    api = new AvOrganizations({
      http: mockHttp,
      promise: Promise,
      merge: mockMerge,
      AvUsers: mockAvUsers,
      config: {},
    });
    expect(api).toBeDefined();
  });

  test('should handle no config passed in', () => {
    api = new AvOrganizations({
      http: mockHttp,
      promise: Promise,
      merge: mockMerge,
      AvUsers: mockAvUsers,
    });
    expect(api).toBeDefined();
  });

  test('should throw error if no AvUsers passed in', () => {
    expect(() => {
      api = new AvOrganizations({
        http: mockHttp,
        promise: Promise,
        merge: mockMerge,
        config: {},
      });
    }).toThrow('[AvUsers] must be defined');
  });

  test('queryOrganizations() should call query with user.id added to params.userId', () => {
    api = new AvOrganizations({
      http: mockHttp,
      promise: Promise,
      merge: mockMerge,
      AvUsers: mockAvUsers,
      config: {},
    });
    api.query = jest.fn();

    const userId = 'testUserId';
    const user = { id: userId };
    const testConfig = {
      name: 'testName',
      params: { otherParam: 'helloWorld' },
    };
    const expectedConfig = Object.assign({}, testConfig);
    expectedConfig.params.userId = userId;

    api.queryOrganizations(user, testConfig);
    expect(api.query).toHaveBeenLastCalledWith(expectedConfig);
  });

  test('queryOrganizations() should handle undefined config param', () => {
    api = new AvOrganizations({
      http: mockHttp,
      promise: Promise,
      merge: mockMerge,
      AvUsers: mockAvUsers,
      config: {},
    });
    api.query = jest.fn();
    const userId = 'testUserId';
    const user = { id: userId };
    const expectedConfig = { params: { userId } };
    api.queryOrganizations(user);
    expect(api.query).toHaveBeenLastCalledWith(expectedConfig);
  });

  test('getOrganizations() should call AvUsers.me() and then queryOrganizations()', async () => {
    api = new AvOrganizations({
      http: mockHttp,
      promise: Promise,
      merge: mockMerge,
      AvUsers: mockAvUsers,
      config: {},
    });
    api.queryOrganizations = jest.fn();

    const testConfig = { name: 'testName' };

    await api.getOrganizations(testConfig);
    expect(api.queryOrganizations).toHaveBeenLastCalledWith(
      mockUser,
      testConfig
    );
  });
});
