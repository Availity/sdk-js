import AvRegions from '../regions';

const mockHttp = jest.fn(() => Promise.resolve({}));
const mockMerge = jest.fn((...args) => Object.assign(...args));

const mockUser = {
  id: 'mockUserId',
};
const mockAvUsers = {
  me: jest.fn(() => Promise.resolve(mockUser)),
};

describe('AvRegions', () => {
  let api;

  test('should be defined', () => {
    api = new AvRegions({
      http: mockHttp,
      promise: Promise,
      merge: mockMerge,
      avUsers: mockAvUsers,
      config: {},
    });
    expect(api).toBeDefined();
  });

  test('should handle no config passed in', () => {
    api = new AvRegions({
      http: mockHttp,
      promise: Promise,
      merge: mockMerge,
      avUsers: mockAvUsers,
    });
    expect(api).toBeDefined();
  });

  test('afterUpdate should call setPageBust and return response', () => {
    api = new AvRegions({
      http: mockHttp,
      promise: Promise,
      merge: mockMerge,
      avUsers: mockAvUsers,
      config: {},
    });
    api.setPageBust = jest.fn();
    const testResponse1 = {};
    const regions = ['testRegion'];
    const testResponse2 = {
      data: {
        regions,
      },
    };
    expect(api.afterUpdate(testResponse1)).toEqual(testResponse1);
    expect(api.afterUpdate(testResponse2)).toEqual(testResponse2);
    expect(api.setPageBust).toHaveBeenCalledTimes(2);
  });

  test('getRegions should fail if avUsers not defined', () => {
    api = new AvRegions({
      http: mockHttp,
      promise: Promise,
      merge: mockMerge,
      config: {},
    });

    expect(() => {
      api.getRegions();
    }).toThrow('avUsers must be defined');
  });

  test('getRegions should call avUsers.me() and then query with result', async () => {
    api = new AvRegions({
      http: mockHttp,
      promise: Promise,
      merge: mockMerge,
      avUsers: mockAvUsers,
      config: {},
    });
    api.query = jest.fn();

    const testConfig = {
      name: 'testName',
      params: { testParam: 'helloWorld' },
    };
    const expectedConfig = Object.assign({}, testConfig);
    Object.assign(expectedConfig.params, { userId: mockUser.id });
    await api.getRegions(testConfig);
    expect(api.query).toHaveBeenLastCalledWith(expectedConfig);
  });

  test('getRegions should handle undefined config param', async () => {
    api = new AvRegions({
      http: mockHttp,
      promise: Promise,
      merge: mockMerge,
      avUsers: mockAvUsers,
      config: {},
    });
    api.query = jest.fn();

    const expectedConfig = { params: { userId: mockUser.id } };
    await api.getRegions();
    expect(api.query).toHaveBeenLastCalledWith(expectedConfig);
  });

  test('getCurrent region should query with param currentlySelected: true', () => {
    api = new AvRegions({
      http: mockHttp,
      promise: Promise,
      merge: mockMerge,
      avUsers: mockAvUsers,
      config: {},
    });
    api.query = jest.fn();
    const expectedConfig = {
      params: {
        currentlySelected: true,
      },
    };
    api.getCurrentRegion();
    expect(api.query).toHaveBeenLastCalledWith(expectedConfig);
  });
});
