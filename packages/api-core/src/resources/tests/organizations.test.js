import AvOrganizations from '../organizations';

const mockHttp = jest.fn(() => Promise.resolve({}));

const mockUser = {
  id: 'mockUserId',
};
const mockAvUsers = {
  me: jest.fn(() => Promise.resolve(mockUser)),
};

describe('AvOrganizations', () => {
  let TestApi;

  test('AvOrganizations should be defined', () => {
    TestApi = new AvOrganizations(mockHttp, Promise, mockAvUsers, {});
    expect(TestApi).toBeDefined();
  });

  test('AvOrganizations should handle no config passed in', () => {
    TestApi = new AvOrganizations(mockHttp, Promise, mockAvUsers);
    expect(TestApi).toBeDefined();
  });

  test('AvOrganizations should throw error if no AvUsers passed in', () => {
    expect(() => {
      TestApi = new AvOrganizations(mockHttp, Promise);
    }).toThrow('[AvUsers] must be defined');
  });

  test('afterQuery should return response.data.organizations if it exists or an empty array', () => {
    TestApi = new AvOrganizations(mockHttp, Promise, mockAvUsers);
    const testResponse1 = {};
    const organizations = ['testOrg'];
    const testResponse2 = {
      data: {
        organizations,
      },
    };
    expect(TestApi.afterQuery(testResponse1)).toEqual([]);
    expect(TestApi.afterQuery(testResponse2)).toEqual(organizations);
  });

  test('queryOrganizations should call query with user.id added to params.userId', () => {
    TestApi = new AvOrganizations(mockHttp, Promise, mockAvUsers);
    TestApi.query = jest.fn();

    const userId = 'testUserId';
    const user = { id: userId };
    const testConfig = { name: 'testName' };
    const expectedConfig = Object.assign(
      {},
      { params: { userId } },
      testConfig
    );

    TestApi.queryOrganizations(user, testConfig);
    expect(TestApi.query).toHaveBeenLastCalledWith(expectedConfig);
  });

  test('getOrganizations should call AvUsers.me() and then queryOrganizations with result', () => {
    TestApi = new AvOrganizations(mockHttp, Promise, mockAvUsers);
    TestApi.queryOrganizations = jest.fn();

    const testConfig = { name: 'testName' };

    return TestApi.getOrganizations(testConfig).then(() => {
      expect(TestApi.queryOrganizations).toHaveBeenLastCalledWith(
        mockUser,
        testConfig
      );
    });
  });
});
