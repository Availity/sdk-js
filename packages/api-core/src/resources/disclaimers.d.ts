import AvApi, { AvApiConfig, RequestConfig, AvApiResponse } from '../api';
import type { DisclaimersResponse } from '../types';

export default class AvDisclaimers extends AvApi {
  constructor(config: AvApiConfig & { http: (config: RequestConfig) => Promise<AvApiResponse> });

  getDisclaimers<T = DisclaimersResponse>(id: string | string[], config?: Partial<AvApiConfig>): Promise<AvApiResponse<T>>;
}
