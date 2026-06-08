import AvApi, { AvApiConfig, RequestConfig, AvApiResponse } from '../api';

export default class AvUserPermissions extends AvApi {
  constructor(config: AvApiConfig & { http: (config: RequestConfig) => Promise<AvApiResponse> });

  afterQuery(response: AvApiResponse): unknown[];

  getPermissions<T = unknown>(permissionId: string | string[], region?: string): Promise<AvApiResponse<T>>;
}
