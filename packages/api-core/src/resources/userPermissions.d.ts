import AvApi, { AvApiConfig, RequestConfig, AvApiResponse } from '../api';
import type { PermissionsResponse } from '../types';

export default class AvUserPermissions extends AvApi {
  constructor(config: AvApiConfig & { http: (config: RequestConfig) => Promise<AvApiResponse> });

  afterQuery(response: AvApiResponse): unknown[];

  getPermissions<T = PermissionsResponse>(permissionId: string | string[], region?: string): Promise<AvApiResponse<T>>;
}
