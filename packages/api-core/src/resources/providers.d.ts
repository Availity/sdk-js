import AvApi, { AvApiConfig, RequestConfig, AvApiResponse } from '../api';
import type { ProvidersResponse } from '../types';

export type { Provider } from '../types';

export default class AvProviders extends AvApi {
  constructor(config: AvApiConfig & { http: (config: RequestConfig) => Promise<AvApiResponse> });

  getProviders<T = ProvidersResponse>(customerId: string, config?: Partial<AvApiConfig>): Promise<AvApiResponse<T>>;

  normalize(providers: Provider[]): Provider[];
}
