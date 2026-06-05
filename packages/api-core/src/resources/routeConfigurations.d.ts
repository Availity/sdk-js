import AvMicroservice from '../ms';
import { AvApiConfig, RequestConfig, AvApiResponse } from '../api';

export default class AvRouteConfigurations extends AvMicroservice {
  constructor(config: AvApiConfig & { http: (config: RequestConfig) => Promise<AvApiResponse> });

  getConfiguration<T = unknown>(
    transactionTypeCode: string,
    submissionModeCode: string,
    payerId: string
  ): Promise<AvApiResponse<T>>;
}
