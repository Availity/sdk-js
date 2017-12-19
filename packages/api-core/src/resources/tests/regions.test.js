import AvRegions from '../regions';

const mockHttp = jest.fn(() => Promise.resolve({}));

const mockUser = {
  id: 'mockUserId',
};
const mockAvUsers = {
  me: jest.fn(() => Promise.resolve(mockUser)),
};

describe('AvRegions', () => {
  let api;

  test('should be defined', () => {
    api = new AvRegions(mockHttp, Promise, mockAvUsers, {});
    expect(api).toBeDefined();
  });

  test('should handle no config passed in', () => {
    api = new AvRegions(mockHttp, Promise);
    expect(api).toBeDefined();
  });

  test('afterUpdate should call setPageBust and return response', () => {
    api = new AvRegions(mockHttp, Promise, mockAvUsers);
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

  test('getRegions should call AvUsers.me() and then query with result', () => {
    api = new AvRegions(mockHttp, Promise, mockAvUsers);
    api.query = jest.fn();

    const testConfig = { name: 'testName' };
    const expectedConfig = Object.assign(
      {},
      { params: { userId: mockUser.id } },
      testConfig
    );

    return api.getRegions(testConfig).then(() => {
      expect(api.query).toHaveBeenLastCalledWith(expectedConfig);
    });
  });

  test('getCurrent region should query with param currentlySelected: true', () => {
    api = new AvRegions(mockHttp, Promise, mockAvUsers);
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
