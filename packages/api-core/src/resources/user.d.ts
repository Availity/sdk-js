import AvApi, { AvApiConfig, RequestConfig, AvApiResponse } from '../api';

export default class AvUsers extends AvApi {
  constructor(config: AvApiConfig & { http: (config: RequestConfig) => Promise<AvApiResponse> });

  me<T = unknown>(config?: Partial<AvApiConfig>): Promise<T>;
}
