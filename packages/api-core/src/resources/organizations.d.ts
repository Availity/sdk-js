import AvApi, { AvApiConfig, RequestConfig, AvApiResponse } from '../api';
import AvUsers from './user';
import AvUserPermissions from './userPermissions';

export type PermissionIds = string | string[] | string[][];

export interface PostGetArgs {
  permissionIds?: PermissionIds;
  resourceIds?: PermissionIds;
}

export interface FilteredOrganization {
  id: string;
  resources: Array<{ id: string; [key: string]: unknown }>;
  match?: boolean;
  [key: string]: unknown;
}

export default class AvOrganizations extends AvApi {
  constructor(
    config: AvApiConfig & {
      http: (config: RequestConfig) => Promise<AvApiResponse>;
      avUsers: AvUsers;
      avUserPermissions: AvUserPermissions;
    }
  );

  avUsers: AvUsers;

  avUserPermissions: AvUserPermissions;

  queryOrganizations<T = unknown>(user: { id: string }, config?: Partial<AvApiConfig>): Promise<AvApiResponse<T>>;

  getOrganizations<T = unknown>(config?: Partial<AvApiConfig>): Promise<AvApiResponse<T>>;

  postGet<T = unknown>(
    data: unknown,
    config?: Partial<AvApiConfig>,
    additionalPostGetArgs?: PostGetArgs
  ): Promise<AvApiResponse<T>>;

  getFilteredOrganizations(additionalPostGetArgs: PostGetArgs, data: unknown): Promise<FilteredOrganization[]>;

  arePermissionsEqual(permissionId: PermissionIds): boolean;

  sanitizeIds(unsanitized: PermissionIds): string | string[];
}
