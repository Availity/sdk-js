import AvApi, { AvApiConfig, RequestConfig, AvApiResponse } from '../api';
import type { UserPermission, UserPermissionsResponse } from '../types';

export type { UserPermission } from '../types';

export default class AvFeatureManagement extends AvApi {
  constructor(config: AvApiConfig & { http: (config: RequestConfig) => Promise<AvApiResponse> });

  afterQuery(response: AvApiResponse): UserPermission[];

  getPermissions<T = UserPermissionsResponse>(
    permissionId: string | string[],
    region?: string
  ): Promise<AvApiResponse<T>>;

  /** Returns true if the user has the permission with at least one authorized organization. */
  hasPermission(permissionId: string, region?: string): Promise<boolean>;

  /** Returns the list of organizations the user is authorized for under the given permission. */
  getAuthorizedOrganizations(
    permissionId: string,
    region?: string
  ): Promise<{ id: string; name?: string; resources?: { id: string }[] }[]>;
}
