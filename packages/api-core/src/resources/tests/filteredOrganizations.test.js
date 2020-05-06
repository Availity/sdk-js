import AvFilteredOrganizations from '../filteredOrganizations';

const mockHttp = jest.fn(() => Promise.resolve({}));
const mockMerge = jest.fn((...args) => Object.assign(...args));

const mockOrg = {
  data: {
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
  },
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
        ],
      },
    ],
  },
};

const mockAvOrganizations = {
  postGet: jest.fn(() => Promise.resolve(mockOrg)),
};
const mockAvUserPermissions = {
  postGet: jest.fn(() => Promise.resolve(mockPermissions)),
};

describe('AvFilteredOrganizations', () => {
  let api;

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should be defined', () => {
    api = new AvFilteredOrganizations({
      http: mockHttp,
      promise: Promise,
      merge: mockMerge,
      avOrganizations: mockAvOrganizations,
      avUserPermissions: mockAvUserPermissions,
      config: {},
    });
    expect(api).toBeDefined();
  });

  test('should handle no config passed in', () => {
    api = new AvFilteredOrganizations({
      http: mockHttp,
      promise: Promise,
      merge: mockMerge,
      avOrganizations: mockAvOrganizations,
      avUserPermissions: mockAvUserPermissions,
    });
    expect(api).toBeDefined();
  });

  test('should filter out org that does not have valid resource', async () => {
    api = new AvFilteredOrganizations({
      http: mockHttp,
      promise: Promise,
      merge: mockMerge,
      avOrganizations: mockAvOrganizations,
      avUserPermissions: mockAvUserPermissions,
    });

    const data = {
      limit: 50,
      offset: 0,
      permissionId: ['7777', '8888'],
      resourceIds: ['10111', '11000'],
      region: 'CA',
    };

    const {
      data: { authorizedFilteredOrgs },
    } = await api.postGet(data);

    expect(authorizedFilteredOrgs.length).toBe(2);
  });

  test('should work when permissionId and resourceId are strings', async () => {
    api = new AvFilteredOrganizations({
      http: mockHttp,
      promise: Promise,
      merge: mockMerge,
      avOrganizations: mockAvOrganizations,
      avUserPermissions: mockAvUserPermissions,
    });

    const data = {
      limit: 50,
      offset: 0,
      permissionId: '7777',
      resourceIds: '10111',
      region: 'CA',
    };

    const {
      data: { authorizedFilteredOrgs },
    } = await api.postGet(data);

    expect(authorizedFilteredOrgs.length).toBe(1);
  });

  test('should work when permissionId and resourceId are arrays', async () => {
    api = new AvFilteredOrganizations({
      http: mockHttp,
      promise: Promise,
      merge: mockMerge,
      avOrganizations: mockAvOrganizations,
      avUserPermissions: mockAvUserPermissions,
    });

    const data = {
      limit: 50,
      offset: 0,
      permissionId: ['7777'],
      resourceIds: ['10111'],
      region: 'CA',
    };

    const {
      data: { authorizedFilteredOrgs },
    } = await api.postGet(data);

    expect(authorizedFilteredOrgs.length).toBe(1);
  });

  test('should work when permissionId is an array and resourceId is a string', async () => {
    api = new AvFilteredOrganizations({
      http: mockHttp,
      promise: Promise,
      merge: mockMerge,
      avOrganizations: mockAvOrganizations,
      avUserPermissions: mockAvUserPermissions,
    });

    const data = {
      limit: 50,
      offset: 0,
      permissionId: ['7777'],
      resourceIds: '10111',
      region: 'CA',
    };

    const {
      data: { authorizedFilteredOrgs },
    } = await api.postGet(data);

    expect(authorizedFilteredOrgs.length).toBe(1);
  });

  test('should work when permissionId is a string and resourceId is an array', async () => {
    api = new AvFilteredOrganizations({
      http: mockHttp,
      promise: Promise,
      merge: mockMerge,
      avOrganizations: mockAvOrganizations,
      avUserPermissions: mockAvUserPermissions,
    });

    const data = {
      limit: 50,
      offset: 0,
      permissionId: '7777',
      resourceIds: ['10111'],
      region: 'CA',
    };

    const {
      data: { authorizedFilteredOrgs },
    } = await api.postGet(data);

    expect(authorizedFilteredOrgs.length).toBe(1);
  });

  test('should work without region passed in', async () => {
    api = new AvFilteredOrganizations({
      http: mockHttp,
      promise: Promise,
      merge: mockMerge,
      avOrganizations: mockAvOrganizations,
      avUserPermissions: mockAvUserPermissions,
    });

    const data = {
      limit: 50,
      offset: 0,
      permissionId: ['7777'],
      resourceIds: ['10111'],
    };

    const {
      data: { authorizedFilteredOrgs },
    } = await api.postGet(data);

    expect(authorizedFilteredOrgs.length).toBe(1);
  });

  test('should  use org data from avOrganizations and not avUserPermissions', async () => {
    api = new AvFilteredOrganizations({
      http: mockHttp,
      promise: Promise,
      merge: mockMerge,
      avOrganizations: mockAvOrganizations,
      avUserPermissions: mockAvUserPermissions,
    });

    const data = {
      limit: 50,
      offset: 0,
      permissionId: '7777',
      resourceIds: ['10111'],
      region: 'CA',
    };

    const {
      data: { authorizedFilteredOrgs },
    } = await api.postGet(data);

    expect(authorizedFilteredOrgs.length).toBe(1);
    expect(authorizedFilteredOrgs[0].address).toBeDefined();
  });
});
