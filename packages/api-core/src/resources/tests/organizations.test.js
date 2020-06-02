import AvOrganizations from '../organizations';

const mockHttp = jest.fn(() => Promise.resolve({}));
const mockMerge = jest.fn((...args) => Object.assign(...args));

const mockUser = {
  id: 'mockUserId',
};
const mockOrg = {
  limit: 50,
  offset: 0,
  count: 3,
  organizations: [
    {
      id: '1435',
      name: 'Availity Test Org',
      address: '1234 Any Place',
    },
    {
      id: '2222',
      name: 'Second Test Org',
      address: '1234 Any Place',
    },
    {
      id: '3333',
      name: 'Third Test Org',
      address: '1234 Any Place',
    },
  ],
};
const mockPermissions = {
  data: {
    axiUserPermissions: [
      {
        id: '7777',
        organizations: [
          {
            id: '1435',
            name: 'Availity Test Org',
            resources: [
              {
                id: '10111',
              },
              {
                id: '10222',
              },
            ],
          },
          {
            id: '2222',
            name: 'Second Test Org',
            resources: [
              {
                id: '10111',
              },
            ],
          },
        ],
      },
      {
        id: '8888',
        organizations: [
          {
            id: '2222',
            name: 'Second Test Org',
            resources: [
              {
                id: '11000',
              },
              {
                id: '11011',
              },
            ],
          },
          {
            id: '1435',
            name: 'Availity Test Org',
            resources: [
              {
                id: '11000',
              },
            ],
          },
        ],
      },
      {
        id: '9999',
        organizations: [
          {
            id: '3333',
            name: 'Third Test Org',
            resources: [
              {
                id: '99999',
              },
            ],
          },
          {
            id: '1435',
            name: 'Availity Test Org',
            resources: [
              {
                id: '90000',
              },
            ],
          },
        ],
      },
    ],
  },
};

const mockAvUsers = {
  me: jest.fn(() => Promise.resolve(mockUser)),
};
const mockAvUserPermissions = {
  postGet: jest.fn(() => Promise.resolve(mockPermissions)),
};

describe('AvOrganizations', () => {
  let api;

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('without additionalPostGetArgs', () => {
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
      const expectedConfig = { ...testConfig };
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

    test('getOrganizations() should skip call to avUsers.me() when userId provided and then query()', async () => {
      api = new AvOrganizations({
        http: mockHttp,
        promise: Promise,
        merge: mockMerge,
        avUsers: mockAvUsers,
        config: {},
      });
      api.queryOrganizations = jest.fn();
      api.query = jest.fn();

      const testConfig = { name: 'testName', params: { userId: 'bmoolenaar' } };

      await api.getOrganizations(testConfig);

      expect(api.queryOrganizations).not.toHaveBeenCalled();
      expect(api.avUsers.me).not.toHaveBeenCalled();
      expect(api.query).toHaveBeenLastCalledWith(testConfig);
    });
  });

  describe('with additionalPostGetArgs', () => {
    test('should filter out org that does not have valid resource', async () => {
      api = new AvOrganizations({
        http: mockHttp,
        promise: Promise,
        merge: mockMerge,
        avUsers: mockAvUsers,
        avUserPermissions: mockAvUserPermissions,
      });

      const data = {
        limit: 50,
        offset: 0,
        permissionId: ['7777', '8888'],
        region: 'CA',
      };

      const additionalPostGetArgs = {
        resourceIds: ['10111', '11000'],
      };

      const {
        data: { authorizedFilteredOrgs },
      } = await api.getFilteredOrganizations(
        mockOrg,
        additionalPostGetArgs,
        data
      );

      expect(authorizedFilteredOrgs.length).toBe(2);
      expect(authorizedFilteredOrgs[0].id).toBe('1435');
      expect(authorizedFilteredOrgs[1].id).toBe('2222');
    });

    test('should work when permissionId and resourceId are strings', async () => {
      api = new AvOrganizations({
        http: mockHttp,
        promise: Promise,
        merge: mockMerge,
        avUsers: mockAvUsers,
        avUserPermissions: mockAvUserPermissions,
      });

      const data = {
        limit: 50,
        offset: 0,
        permissionId: '7777',
        region: 'CA',
      };

      const additionalPostGetArgs = {
        resourceIds: ['10222'],
      };

      const {
        data: { authorizedFilteredOrgs },
      } = await api.getFilteredOrganizations(
        mockOrg,
        additionalPostGetArgs,
        data
      );

      expect(authorizedFilteredOrgs.length).toBe(1);
    });

    test('should work when permissionId and resourceId are numbers', async () => {
      api = new AvOrganizations({
        http: mockHttp,
        promise: Promise,
        merge: mockMerge,
        avUsers: mockAvUsers,
        avUserPermissions: mockAvUserPermissions,
      });

      const data = {
        limit: 50,
        offset: 0,
        permissionId: 7777,
        region: 'CA',
      };

      const additionalPostGetArgs = {
        resourceIds: [10111],
      };

      const {
        data: { authorizedFilteredOrgs },
      } = await api.getFilteredOrganizations(
        mockOrg,
        additionalPostGetArgs,
        data
      );

      expect(authorizedFilteredOrgs.length).toBe(2);
    });

    test('should work when permissionId and resourceId are arrays', async () => {
      api = new AvOrganizations({
        http: mockHttp,
        promise: Promise,
        merge: mockMerge,
        avUsers: mockAvUsers,
        avUserPermissions: mockAvUserPermissions,
      });

      const data = {
        limit: 50,
        offset: 0,
        region: 'CA',
      };

      const additionalPostGetArgs = {
        permissionIds: ['7777'],
        resourceIds: ['10222'],
      };

      const {
        data: { authorizedFilteredOrgs },
      } = await api.getFilteredOrganizations(
        mockOrg,
        additionalPostGetArgs,
        data
      );

      expect(authorizedFilteredOrgs.length).toBe(1);
    });

    test('should work when permissionId is an array and resourceId is a string', async () => {
      api = new AvOrganizations({
        http: mockHttp,
        promise: Promise,
        merge: mockMerge,
        avUsers: mockAvUsers,
        avUserPermissions: mockAvUserPermissions,
      });

      const data = {
        limit: 50,
        offset: 0,
        permissionId: ['7777'],
        region: 'CA',
      };

      const additionalPostGetArgs = {
        resourceIds: '10222',
      };

      const {
        data: { authorizedFilteredOrgs },
      } = await api.getFilteredOrganizations(
        mockOrg,
        additionalPostGetArgs,
        data
      );

      expect(authorizedFilteredOrgs.length).toBe(1);
    });

    test('should work when permissionId is a string and resourceId is an array', async () => {
      api = new AvOrganizations({
        http: mockHttp,
        promise: Promise,
        merge: mockMerge,
        avUsers: mockAvUsers,
        avUserPermissions: mockAvUserPermissions,
      });

      const data = {
        limit: 50,
        offset: 0,
        permissionId: '7777',
        region: 'CA',
      };

      const additionalPostGetArgs = {
        resourceIds: ['10222'],
      };

      const {
        data: { authorizedFilteredOrgs },
      } = await api.getFilteredOrganizations(
        mockOrg,
        additionalPostGetArgs,
        data
      );

      expect(authorizedFilteredOrgs.length).toBe(1);
    });

    test('should work without region passed in', async () => {
      api = new AvOrganizations({
        http: mockHttp,
        promise: Promise,
        merge: mockMerge,
        avUsers: mockAvUsers,
        avUserPermissions: mockAvUserPermissions,
      });

      const data = {
        limit: 50,
        offset: 0,
      };

      const additionalPostGetArgs = {
        permissionIds: ['7777'],
        resourceIds: ['10222'],
      };

      const {
        data: { authorizedFilteredOrgs },
      } = await api.getFilteredOrganizations(
        mockOrg,
        additionalPostGetArgs,
        data
      );

      expect(authorizedFilteredOrgs.length).toBe(1);
    });

    test('should use org data from avOrganizations and not avUserPermissions', async () => {
      api = new AvOrganizations({
        http: mockHttp,
        promise: Promise,
        merge: mockMerge,
        avUsers: mockAvUsers,
        avUserPermissions: mockAvUserPermissions,
      });

      const data = {
        limit: 50,
        offset: 0,
        region: 'CA',
      };

      const additionalPostGetArgs = {
        permissionIds: '7777',
        resourceIds: ['10222'],
      };

      const {
        data: { authorizedFilteredOrgs },
      } = await api.getFilteredOrganizations(
        mockOrg,
        additionalPostGetArgs,
        data
      );

      expect(authorizedFilteredOrgs.length).toBe(1);
      expect(authorizedFilteredOrgs[0].address).toBeDefined();
    });

    test('should filter organizations by AND permissions', async () => {
      api = new AvOrganizations({
        http: mockHttp,
        promise: Promise,
        merge: mockMerge,
        avUsers: mockAvUsers,
        avUserPermissions: mockAvUserPermissions,
      });

      const data = {
        limit: 50,
        offset: 0,
        region: 'CA',
      };

      const additionalPostGetArgs = {
        permissionIds: [['7777', '8888']],
        resourceIds: [['10111', '11000']],
      };

      const {
        data: { authorizedFilteredOrgs },
      } = await api.getFilteredOrganizations(
        mockOrg,
        additionalPostGetArgs,
        data
      );

      expect(authorizedFilteredOrgs.length).toBe(2);
      expect(authorizedFilteredOrgs[0].id).toBe('1435');
      expect(authorizedFilteredOrgs[1].id).toBe('2222');
    });

    test('should filter organizations by permissions and no resources', async () => {
      api = new AvOrganizations({
        http: mockHttp,
        promise: Promise,
        merge: mockMerge,
        avUsers: mockAvUsers,
        avUserPermissions: mockAvUserPermissions,
      });

      const data = {
        limit: 50,
        offset: 0,
        region: 'CA',
      };

      const additionalPostGetArgs = {
        permissionIds: [[7777, 9999]],
      };

      const {
        data: { authorizedFilteredOrgs },
      } = await api.getFilteredOrganizations(
        mockOrg,
        additionalPostGetArgs,
        data
      );

      expect(authorizedFilteredOrgs.length).toBe(1);
      expect(authorizedFilteredOrgs[0].id).toBe('1435');
    });

    //
    test('should filter organizations by AND permissions + AND resources', async () => {
      api = new AvOrganizations({
        http: mockHttp,
        promise: Promise,
        merge: mockMerge,
        avUsers: mockAvUsers,
        avUserPermissions: mockAvUserPermissions,
      });

      const data = {
        limit: 50,
        offset: 0,
        region: 'CA',
      };

      const additionalPostGetArgs = {
        permissionIds: [[7777, 8888]],
        resourceIds: [[10111, 10222, 11000]],
      };

      const {
        data: { authorizedFilteredOrgs },
      } = await api.getFilteredOrganizations(
        mockOrg,
        additionalPostGetArgs,
        data
      );

      expect(authorizedFilteredOrgs.length).toBe(1);
      expect(authorizedFilteredOrgs[0].id).toBe('1435');
    });

    test('should filter organizations by OR + AND permissions', async () => {
      api = new AvOrganizations({
        http: mockHttp,
        promise: Promise,
        merge: mockMerge,
        avUsers: mockAvUsers,
        avUserPermissions: mockAvUserPermissions,
      });

      const data = {
        limit: 50,
        offset: 0,
        region: 'CA',
      };

      const additionalPostGetArgs = {
        permissionIds: [
          [7777, 9999],
          [7777, 8888],
        ],
        resourceIds: [
          [10111, 90000],
          [10111, 11011],
        ],
      };

      const {
        data: { authorizedFilteredOrgs },
      } = await api.getFilteredOrganizations(
        mockOrg,
        additionalPostGetArgs,
        data
      );

      expect(authorizedFilteredOrgs.length).toBe(2);
      expect(authorizedFilteredOrgs[0].id).toBe('1435');
      expect(authorizedFilteredOrgs[1].id).toBe('2222');
    });

    test('should filter organizations by AND permissions + AND resources with no results', async () => {
      api = new AvOrganizations({
        http: mockHttp,
        promise: Promise,
        merge: mockMerge,
        avUsers: mockAvUsers,
        avUserPermissions: mockAvUserPermissions,
      });

      const data = {
        limit: 50,
        offset: 0,
        region: 'CA',
      };

      const additionalPostGetArgs = {
        permissionIds: [[7777, 9999]],
        resourceIds: [[10111, 10222, 99999]],
      };

      const {
        data: { authorizedFilteredOrgs },
      } = await api.getFilteredOrganizations(
        mockOrg,
        additionalPostGetArgs,
        data
      );

      expect(authorizedFilteredOrgs.length).toBe(0);
    });

    test('should filter organizations by AND resources', async () => {
      api = new AvOrganizations({
        http: mockHttp,
        promise: Promise,
        merge: mockMerge,
        avUsers: mockAvUsers,
        avUserPermissions: mockAvUserPermissions,
      });

      const data = {
        leimit: 50,
        offset: 0,
        region: 'CA',
      };

      const additionalPostGetArgs = {
        permissionIds: [7777],
        resourceIds: [[10111, 10222]],
      };

      const {
        data: { authorizedFilteredOrgs },
      } = await api.getFilteredOrganizations(
        mockOrg,
        additionalPostGetArgs,
        data
      );

      expect(authorizedFilteredOrgs.length).toBe(1);
    });

    test('should filter organizations by OR resources', async () => {
      api = new AvOrganizations({
        http: mockHttp,
        promise: Promise,
        merge: mockMerge,
        avUsers: mockAvUsers,
        avUserPermissions: mockAvUserPermissions,
      });

      const data = {
        leimit: 50,
        offset: 0,
        region: 'CA',
      };

      const additionalPostGetArgs = {
        permissionIds: [9999, 8888],
        resourceIds: [99999, 90000], // OR for perm 9999, no resources on 8888 means none are valid
      };

      const {
        data: { authorizedFilteredOrgs },
      } = await api.getFilteredOrganizations(
        mockOrg,
        additionalPostGetArgs,
        data
      );

      expect(authorizedFilteredOrgs.length).toBe(2);
    });
  });

  describe('sanitizeIds', () => {
    test('converts arrays/numbers to strings', () => {
      expect(api.sanitizeIds(7777)).toEqual('7777');
      expect(api.sanitizeIds([7777])).toEqual(['7777']);
      expect(api.sanitizeIds([7777, '8888'])).toEqual(['7777', '8888']);
      expect(api.sanitizeIds('7777')).toEqual('7777');
      expect(api.sanitizeIds([[7777]])).toEqual([['7777']]);
      expect(api.sanitizeIds([[7777, 8888], 9999])).toEqual([
        ['7777', '8888'],
        '9999',
      ]);
      expect(api.sanitizeIds([9999, ''])).toEqual(['9999', '']);
      expect(
        api.sanitizeIds([
          [7777, 9999],
          [7777, 8888],
        ])
      ).toEqual([
        ['7777', '9999'],
        ['7777', '8888'],
      ]);
    });
  });

  describe('arePermissionsEqual', () => {
    test('works for strings', async () => {
      api = new AvOrganizations({
        http: mockHttp,
        promise: Promise,
        merge: mockMerge,
        avUsers: mockAvUsers,
        avUserPermissions: mockAvUserPermissions,
      });
      api.previousPermissionIds = api.sanitizeIds('7777');
      expect(api.arePermissionsEqual(api.sanitizeIds('7777'))).toBe(true);
      expect(api.arePermissionsEqual(api.sanitizeIds(7777))).toBe(true);
      expect(api.arePermissionsEqual(api.sanitizeIds([7777]))).toBe(true);
      expect(api.arePermissionsEqual(api.sanitizeIds([8888]))).toBe(false);
    });

    test('works for array', async () => {
      api = new AvOrganizations({
        http: mockHttp,
        promise: Promise,
        merge: mockMerge,
        avUsers: mockAvUsers,
        avUserPermissions: mockAvUserPermissions,
      });
      api.previousPermissionIds = api.sanitizeIds(['7777', '8888']);
      expect(api.arePermissionsEqual(api.sanitizeIds(['8888', '7777']))).toBe(
        true
      );
      expect(api.arePermissionsEqual(api.sanitizeIds(['7777', '9999']))).toBe(
        false
      );
    });

    test('works for nested array', async () => {
      api = new AvOrganizations({
        http: mockHttp,
        promise: Promise,
        merge: mockMerge,
        avUsers: mockAvUsers,
        avUserPermissions: mockAvUserPermissions,
      });
      api.previousPermissionIds = api.sanitizeIds([[7777, 8888], [9999]]);
      expect(
        api.arePermissionsEqual(api.sanitizeIds(['8888', '7777', '9999']))
      ).toBe(true);
      expect(
        api.arePermissionsEqual(api.sanitizeIds([['8888', '7777'], ['9999']]))
      ).toBe(true);
      expect(api.arePermissionsEqual(api.sanitizeIds([['7777', '8888']]))).toBe(
        false
      );
      expect(
        api.arePermissionsEqual(api.sanitizeIds([['7777', '8888'], ['5555']]))
      ).toBe(false);
    });
  });
});
