import AvApi, { AvApiConfig, RequestConfig, AvApiResponse } from '../api';
import type { User } from '../types';

export default class AvUsers extends AvApi {
  constructor(config: AvApiConfig & { http: (config: RequestConfig) => Promise<AvApiResponse> });

  me<T = User>(config?: Partial<AvApiConfig>): Promise<T>;
}
