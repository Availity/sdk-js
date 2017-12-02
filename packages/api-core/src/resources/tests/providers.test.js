import AvProviders from '../providers';

const mockHttp = jest.fn(() => Promise.resolve({}));

describe('AvProviders', () => {
  let api;

  test('AvProviders should be defined', () => {
    api = new AvProviders(mockHttp, Promise, {});
    expect(api).toBeDefined();
  });

  test('AvProviders should handle no config passed in', () => {
    api = new AvProviders(mockHttp, Promise);
    expect(api).toBeDefined();
  });

  test('afterQuery should return response.data.providers if it exists or an empty array', () => {
    api = new AvProviders(mockHttp, Promise);
    const testResponse1 = {};
    const providers = ['testProvider'];
    const testResponse2 = {
      data: {
        providers,
      },
    };
    expect(api.afterQuery(testResponse1)).toEqual([]);
    expect(api.afterQuery(testResponse2)).toEqual(providers);
  });

  test('getProviders should query with customerId param added', () => {
    api = new AvProviders(mockHttp, Promise);
    api.query = jest.fn();

    const customerId = 'testCustomerId';
    const testConfig = { name: 'testName' };
    const expectedConfig = Object.assign(
      {},
      { params: { customerId } },
      testConfig
    );

    api.getProviders(customerId, testConfig);
    expect(api.query).toHaveBeenLastCalledWith(expectedConfig);
  });
});
