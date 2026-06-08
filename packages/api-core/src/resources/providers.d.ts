import AvApi, { AvApiConfig, RequestConfig, AvApiResponse } from '../api';

export interface Provider {
  businessName?: string;
  lastName?: string;
  firstName?: string;
  name?: string;
  [key: string]: unknown;
}

export default class AvProviders extends AvApi {
  constructor(config: AvApiConfig & { http: (config: RequestConfig) => Promise<AvApiResponse> });

  getProviders<T = unknown>(customerId: string, config?: Partial<AvApiConfig>): Promise<AvApiResponse<T>>;

  normalize(providers: Provider[]): Provider[];
}
