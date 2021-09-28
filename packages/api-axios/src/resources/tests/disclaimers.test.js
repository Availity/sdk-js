import AvDisclaimersApi from '../disclaimers';

describe('AvDisclaimersApi', () => {
  let api;
  beforeEach(() => {
    api = new AvDisclaimersApi();
  });

  test('AvDisclaimersApi should be defined', () => {
    expect(api).toBeDefined();
  });

  test('url should be correct', () => {
    expect(api.getUrl(api.config())).toBe('/api/sdk/platform/v1/disclaimers');
  });

  test('getDisclaimers should query with id param added', async () => {
    api.query = jest.fn();

    const id = 'testId';
    const testConfig = {
      name: 'testName',
      params: { testParam: 'hello world' },
    };
    const expectedConfig = { ...testConfig };
    Object.assign(expectedConfig.params, { id });

    await api.getDisclaimers(id, testConfig);
    expect(api.query).toHaveBeenLastCalledWith(expectedConfig);
  });
});
