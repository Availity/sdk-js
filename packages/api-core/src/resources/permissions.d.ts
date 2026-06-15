import AvApi, { AvApiConfig, RequestConfig, AvApiResponse } from '../api';
import type { PermissionsResponse } from '../types';

export default class AvPermissions extends AvApi {
  constructor(config: AvApiConfig & { http: (config: RequestConfig) => Promise<AvApiResponse> });

  getPermissions<T = PermissionsResponse>(id: string | string[], region?: string): Promise<AvApiResponse<T>>;
}
