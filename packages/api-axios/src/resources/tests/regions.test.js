import AvRegionsApi from '../regions';
import { avUserApi } from '../user';

jest.mock('../user');

const mockUser = {
  id: 'mockUserId',
};

avUserApi.me = jest.fn(() => Promise.resolve(mockUser));

describe('AvRegionsApi', () => {
  let api;

  beforeEach(() => {
    api = new AvRegionsApi();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should be defined', () => {
    expect(api).toBeDefined();
  });

  test('url should be correct', () => {
    expect(api.getUrl(api.config())).toBe('/api/sdk/platform/v1/regions');
  });

  test('afterUpdate should call setPageBust and return response', () => {
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

  test('getRegions should call avUsers.me() and then query with result', async () => {
    api.query = jest.fn();

    const testConfig = {
      name: 'testName',
      params: { testParam: 'helloWorld' },
    };
    const expectedConfig = { ...testConfig };
    Object.assign(expectedConfig.params, { userId: mockUser.id });

    await api.getRegions(testConfig);
    expect(api.query).toHaveBeenLastCalledWith(expectedConfig);
  });

  test('getRegions should skip call to avUsers.me() if a userId is provided', async () => {
    api.query = jest.fn();

    const testConfig = {
      name: 'testName',
      params: { userId: mockUser.id },
    };

    await api.getRegions(testConfig);
    expect(api.query).toHaveBeenLastCalledWith(testConfig);
  });

  test('getRegions should handle undefined config param', async () => {
    api.query = jest.fn();

    const expectedConfig = { params: { userId: mockUser.id } };
    await api.getRegions();
    expect(api.query).toHaveBeenLastCalledWith(expectedConfig);
  });

  test('getCurrent region should query with param currentlySelected: true', () => {
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
