// @vitest-environment node
import AvRegionsApi from '../regions';
import { avUserApi } from '../user';
import server from '../../../mocks/server';

vi.mock('../user');

const mockUser = {
  id: 'mockUserId',
};

avUserApi.me = vi.fn(() => Promise.resolve(mockUser));

describe('AvRegionsApi', () => {
  let api;

  beforeAll(() => server.listen());
  beforeEach(() => {
    api = new AvRegionsApi();
  });
  afterEach(() => {
    vi.clearAllMocks();
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

    api.setPageBust = vi.fn();
    api.http = vi.fn().mockResolvedValue({ data: { id: region } });

    const resp = await api.put(region);

    expect(resp.data.id).toBe(region);
    expect(api.setPageBust).toHaveBeenCalledTimes(1);
  });

  test('getRegions should call avUsers.me() and then query with result', async () => {
    api.query = vi.fn();

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
    api.query = vi.fn();

    const testConfig = {
      name: 'testName',
      params: { userId: mockUser.id },
    };

    await api.getRegions(testConfig);
    expect(api.query).toHaveBeenLastCalledWith(testConfig);
  });

  test('getRegions should handle undefined config param', async () => {
    api.query = vi.fn();

    const expectedConfig = { params: { userId: mockUser.id } };
    await api.getRegions();
    expect(api.query).toHaveBeenLastCalledWith(expectedConfig);
  });

  test('getCurrent region should query with param currentlySelected: true', () => {
    api.query = vi.fn();
    const expectedConfig = {
      params: {
        currentlySelected: true,
      },
    };
    api.getCurrentRegion();
    expect(api.query).toHaveBeenLastCalledWith(expectedConfig);
  });

  test('getRegions issues a real HTTP request through MSW and returns regions', async () => {
    // This is the only test that uses the MSW server — all others mock api.query directly.
    // Axios in Node requires an absolute URL; configure baseURL so the relative path
    // /api/sdk/platform/v1/regions becomes http://localhost/api/sdk/platform/v1/regions,
    // which matches the MSW wildcard handler (*/api/sdk/platform/v1/regions).
    api.http.defaults.baseURL = 'http://localhost';
    const result = await api.getRegions();
    expect(result.data.regions).toEqual(expect.arrayContaining([expect.objectContaining({ id: 'FL' })]));
    expect(result.data.totalCount).toBeGreaterThan(0);
  });

  test('should get correct result when all() is called with a single page', async () => {
    // Provide totalCount so Math.ceil(totalCount/limit) = 1 — single page path
    api.query = vi.fn(() =>
      Promise.resolve({
        status: 200,
        data: {
          totalCount: 1,
          limit: 50,
          regionAggregations: [],
          regions: [{ id: 'FL', value: 'Florida' }],
        },
      })
    );

    expect(await api.all()).toEqual([{ id: 'FL', value: 'Florida' }]);
  });

  test('should aggregate results when all() spans multiple pages', async () => {
    // First call (page 1) returns 1 of 2 items with totalCount driving pagination
    const page1 = { id: 'FL', value: 'Florida' };
    const page2 = { id: 'GA', value: 'Georgia' };

    api.query = vi.fn(() =>
      Promise.resolve({
        status: 200,
        data: {
          totalCount: 2,
          limit: 1,
          regions: [page1],
        },
      })
    );

    // getPage() calls query() for page 2 — return page2 from the second call
    api.query
      .mockResolvedValueOnce({
        status: 200,
        data: { totalCount: 2, limit: 1, regions: [page1] },
      })
      .mockResolvedValueOnce({
        status: 200,
        data: { totalCount: 2, limit: 1, regions: [page2] },
      });

    const result = await api.all();
    expect(result).toEqual([page1, page2]);
    expect(api.query).toHaveBeenCalledTimes(2);
  });
});
