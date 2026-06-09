import AvDisclaimers from '../disclaimers';

const mockHttp = vi.fn(() => Promise.resolve({}));

describe('AvDisclaimers', () => {
  let api;

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('AvDisclaimers should be defined', () => {
    api = new AvDisclaimers({ http: mockHttp });
    expect(api).toBeDefined();
  });

  test('AvDisclaimers should handle no config passed in', () => {
    api = new AvDisclaimers({
      http: mockHttp,
      promise: Promise,
    });
    expect(api).toBeDefined();
  });

  test('getDisclaimers should query with id param added', () => {
    api = new AvDisclaimers({ http: mockHttp });
    api.query = vi.fn();

    const id = 'testId';
    const testConfig = {
      name: 'testName',
      params: { testParam: 'hello world' },
    };
    const expectedConfig = { ...testConfig };
    Object.assign(expectedConfig.params, { id });
    api.getDisclaimers(id, testConfig);
    expect(api.query).toHaveBeenLastCalledWith(expectedConfig);
  });
});
