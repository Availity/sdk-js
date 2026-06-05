import AvMicroservice from '../ms';

export default class AvRouteConfigurations extends AvMicroservice {
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
