import AvApi, { AvApiConfig, RequestConfig, AvApiResponse } from '../api';

export default class AvPermissions extends AvApi {
  constructor(config: AvApiConfig & { http: (config: RequestConfig) => Promise<AvApiResponse> });

  getPermissions<T = unknown>(id: string | string[], region?: string): Promise<AvApiResponse<T>>;
}
