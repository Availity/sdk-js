import AvProviders from '../providers';

const mockHttp = vi.fn(() => Promise.resolve({}));

describe('AvProviders', () => {
  let api;

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('AvProviders should be defined', () => {
    api = new AvProviders({ http: mockHttp });
    expect(api).toBeDefined();
  });

  test('AvProviders should handle no config passed in', () => {
    api = new AvProviders({
      http: mockHttp,
      promise: Promise,
    });
    expect(api).toBeDefined();
  });

  test('getProviders should query with customerId param added', () => {
    api = new AvProviders({ http: mockHttp });
    api.query = vi.fn();

    const customerId = 'testCustomerId';
    const testConfig = {
      name: 'testName',
      params: { testParam: 'hello world' },
    };
    const expectedConfig = { ...testConfig };
    Object.assign(expectedConfig.params, { customerId });
    api.getProviders(customerId, testConfig);
    expect(api.query).toHaveBeenLastCalledWith(expectedConfig);
  });

  test('getProviders should handle undefined config param', () => {
    api = new AvProviders({ http: mockHttp });
    api.query = vi.fn();

    const customerId = 'testCustomerId';
    const expectedConfig = { params: { customerId } };
    api.getProviders(customerId);
    expect(api.query).toHaveBeenLastCalledWith(expectedConfig);
  });

  test('normalize() should add name atttribute to collection', () => {
    api = new AvProviders({ http: mockHttp });

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
