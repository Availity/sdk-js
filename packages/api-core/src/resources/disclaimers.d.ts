import AvApi, { AvApiConfig, RequestConfig, AvApiResponse } from '../api';

export default class AvDisclaimers extends AvApi {
  constructor(config: AvApiConfig & { http: (config: RequestConfig) => Promise<AvApiResponse> });

  getDisclaimers<T = unknown>(id: string | string[], config?: Partial<AvApiConfig>): Promise<AvApiResponse<T>>;
}
