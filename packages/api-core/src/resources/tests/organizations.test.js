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
      avUsers: mockAvUsers,
      config: {},
    });
    expect(api).toBeDefined();
  });

  test('should handle no config passed in', () => {
    api = new AvOrganizations({
      http: mockHttp,
      promise: Promise,
      merge: mockMerge,
      avUsers: mockAvUsers,
    });
    expect(api).toBeDefined();
  });
  test('queryOrganizations() should call query with user.id added to params.userId', () => {
    api = new AvOrganizations({
      http: mockHttp,
      promise: Promise,
      merge: mockMerge,
      avUsers: mockAvUsers,
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
      avUsers: mockAvUsers,
      config: {},
    });
    api.query = jest.fn();
    const userId = 'testUserId';
    const user = { id: userId };
    const expectedConfig = { params: { userId } };
    api.queryOrganizations(user);
    expect(api.query).toHaveBeenLastCalledWith(expectedConfig);
  });

  test('getOrganizations() should throw error if no avUsers passed in', () => {
    api = new AvOrganizations({
      http: mockHttp,
      promise: Promise,
      merge: mockMerge,
      config: {},
    });

    expect(() => {
      api.getOrganizations();
    }).toThrow('avUsers must be defined');
  });

  test('getOrganizations() should call avUsers.me() and then queryOrganizations()', async () => {
    api = new AvOrganizations({
      http: mockHttp,
      promise: Promise,
      merge: mockMerge,
      avUsers: mockAvUsers,
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
