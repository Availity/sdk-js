import AvProvidersApi from '../providers';

describe('AvProvidersApi', () => {
  let api;
  beforeEach(() => {
    api = new AvProvidersApi();
  });

  test('AvProvidersApi should be defined', () => {
    expect(api).toBeDefined();
  });

  test('url should be correct', () => {
    expect(api.getUrl(api.config())).toBe('/api/internal/v1/providers');
  });

  test('getProviders should query with customerId param added', async () => {
    api.query = jest.fn();

    const customerId = 'testCustomerId';
    const testConfig = {
      name: 'testName',
      params: { testParam: 'hello world' },
    };
    const expectedConfig = { ...testConfig };
    Object.assign(expectedConfig.params, { customerId });

    await api.getProviders(customerId, testConfig);
    expect(api.query).toHaveBeenLastCalledWith(expectedConfig);
  });

  test('getProviders should handle undefined config param', async () => {
    api.query = jest.fn();

    const customerId = 'testCustomerId';
    const expectedConfig = { params: { customerId } };

    await api.getProviders(customerId);
    expect(api.query).toHaveBeenLastCalledWith(expectedConfig);
  });

  test('normalize() should add name atttribute to collection', () => {
    const providers = api.normalize([
      {
        businessName: 'a',
      },
      {
        lastName: 'b',
        firstName: 'c',
      },
    ]);

    expect(providers[0].name).toBe('a');
    expect(providers[1].name).toBe('b, c');
  });
});
