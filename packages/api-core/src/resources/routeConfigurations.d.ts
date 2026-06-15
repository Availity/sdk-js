import AvMicroservice from '../ms';
import { AvApiConfig, RequestConfig, AvApiResponse } from '../api';
import type { RouteConfiguration } from '../types';

export default class AvRouteConfigurations extends AvMicroservice {
  constructor(config: AvApiConfig & { http: (config: RequestConfig) => Promise<AvApiResponse> });

  getConfiguration<T = RouteConfiguration>(
    transactionTypeCode: string,
    submissionModeCode: string,
    payerId: string
  ): Promise<AvApiResponse<T>>;
}
