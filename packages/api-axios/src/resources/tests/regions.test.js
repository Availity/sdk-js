import AvRegionsApi from '../regions';
import { avUserApi } from '../user';
import server from '../../../mocks/server';

jest.mock('../user');

const mockUser = {
  id: 'mockUserId',
};

avUserApi.me = jest.fn(() => Promise.resolve(mockUser));

describe('AvRegionsApi', () => {
  let api;

  beforeAll(() => server.listen());
  beforeEach(() => {
    api = new AvRegionsApi();
  });
  afterEach(() => {
    jest.clearAllMocks();
    server.resetHandlers();
  });
  afterAll(() => server.close());

  test('should be defined', () => {
    expect(api).toBeDefined();
  });

  test('url should be correct', () => {
    expect(api.getUrl(api.config())).toBe('/api/sdk/platform/v1/regions');
  });

  test('afterUpdate should call setPageBust and return response', async () => {
    const region = 'FL';

    api.setPageBust = jest.fn();
    api.http = jest.fn().mockResolvedValue({ data: { id: region } });

    const resp = await api.put(region);

    expect(resp.data.id).toBe(region);
    expect(api.setPageBust).toHaveBeenCalledTimes(1);
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

  test('should get correct result when all() is called', async () => {
    api.query = jest.fn(() =>
      Promise.resolve({
        status: 200,
        data: {
          regionAggregations: [],
          regions: [{ id: 'FL', value: 'Florida' }],
        },
      })
    );

    expect(await api.all()).toEqual([{ id: 'FL', value: 'Florida' }]);
  });
});
