import AvOrganizations from '../organizations';

const mockHttp = jest.fn(() => Promise.resolve({}));

const mockUser = {
  id: 'mockUserId',
};
const mockAvUsers = {
  me: jest.fn(() => Promise.resolve(mockUser)),
};

describe('AvOrganizations', () => {
  let api;

  test('should be defined', () => {
    api = new AvOrganizations(mockHttp, Promise, mockAvUsers, {});
    expect(api).toBeDefined();
  });

  test('should handle no config passed in', () => {
    api = new AvOrganizations(mockHttp, Promise, mockAvUsers);
    expect(api).toBeDefined();
  });

  test('should throw error if no AvUsers passed in', () => {
    expect(() => {
      api = new AvOrganizations(mockHttp, Promise);
    }).toThrow('[avUsers] must be defined');
  });

  test('queryOrganizations() should call query with user.id added to params.userId', () => {
    api = new AvOrganizations(mockHttp, Promise, mockAvUsers);
    api.query = jest.fn();

    const userId = 'testUserId';
    const user = { id: userId };
    const testConfig = { name: 'testName' };
    const expectedConfig = Object.assign(
      {},
      { params: { userId } },
      testConfig
    );

    api.queryOrganizations(user, testConfig);
    expect(api.query).toHaveBeenLastCalledWith(expectedConfig);
  });

  test('getOrganizations() should call AvUsers.me() and then queryOrganizations()', async () => {
    api = new AvOrganizations(mockHttp, Promise, mockAvUsers);
    api.queryOrganizations = jest.fn();

    const testConfig = { name: 'testName' };

    await api.getOrganizations(testConfig);
    expect(api.queryOrganizations).toHaveBeenLastCalledWith(
      mockUser,
      testConfig
    );
  });
});
