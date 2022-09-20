import AvRouteConfigurationsApi from '../routeConfigurations';

describe('AvRouteConfigurationsApi', () => {
  let api;
  beforeEach(() => {
    api = new AvRouteConfigurationsApi();
  });

  test('should be defined', () => {
    expect(api).toBeDefined();
  });

  test('url should be correct', () => {
    expect(api.getUrl(api.config())).toBe(
      '/ms/api/availity/internal/epdm/configuration-service/epdm/v1/route-configuration'
    );
  });

  test('getConfiguration should query with transactionTypeCode, submissionModeCode, and payerId params from arguments', async () => {
    api.query = jest.fn();

    const transactionTypeCode = '1';
    const submissionModeCode = '10';
    const payerId = 'AVAILITY';
    const expectedConfig = { params: { transactionTypeCode, submissionModeCode, payerId } };

    await api.getConfiguration(transactionTypeCode, submissionModeCode, payerId);
    expect(api.query).toHaveBeenLastCalledWith(expectedConfig);
  });
});
