import AvMicroserviceApi from '../ms';

export default class AvRouteConfigurationsApi extends AvMicroserviceApi {
  constructor(config) {
    super({
      name: 'epdm/configuration-service/epdm/v1/route-configuration',
      ...config,
    });
  }

  async getConfiguration(transactionTypeCode, submissionModeCode, payerId) {
    return this.query({
      params: { transactionTypeCode, submissionModeCode, payerId },
    });
  }
}

export const avRouteConfigurationsApi = new AvRouteConfigurationsApi();
