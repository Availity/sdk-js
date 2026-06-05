import AvDisclaimers from '../disclaimers';

const mockHttp = jest.fn(() => Promise.resolve({}));

describe('AvDisclaimers', () => {
  let api;

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
    api.query = jest.fn();

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
