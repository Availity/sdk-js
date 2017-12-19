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
