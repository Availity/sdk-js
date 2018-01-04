import AvProviders from '../providers';

const mockHttp = jest.fn(() => Promise.resolve({}));
const mockMerge = jest.fn((...args) => Object.assign(...args));

describe('AvProviders', () => {
  let api;

  test('AvProviders should be defined', () => {
    api = new AvProviders({
      http: mockHttp,
      promise: Promise,
      merge: mockMerge,
      config: {},
    });
    expect(api).toBeDefined();
  });

  test('AvProviders should handle no config passed in', () => {
    api = new AvProviders({
      http: mockHttp,
      promise: Promise,
      merge: mockMerge,
    });
    expect(api).toBeDefined();
  });

  test('getProviders should query with customerId param added', () => {
    api = new AvProviders({
      http: mockHttp,
      promise: Promise,
      merge: mockMerge,
      config: {},
    });
    api.query = jest.fn();

    const customerId = 'testCustomerId';
    const testConfig = {
      name: 'testName',
      params: { testParam: 'hello world' },
    };
    const expectedConfig = Object.assign({}, testConfig);
    Object.assign(expectedConfig.params, { customerId });
    api.getProviders(customerId, testConfig);
    expect(api.query).toHaveBeenLastCalledWith(expectedConfig);
  });

  test('getProviders should handle undefined config param', () => {
    api = new AvProviders({
      http: mockHttp,
      promise: Promise,
      merge: mockMerge,
      config: {},
    });
    api.query = jest.fn();

    const customerId = 'testCustomerId';
    const expectedConfig = { params: { customerId } };
    api.getProviders(customerId);
    expect(api.query).toHaveBeenLastCalledWith(expectedConfig);
  });
});
