export interface Resource {
  id: string;
  [key: string]: unknown;
}

export interface Organization {
  id: string;
  resources?: Resource[];
  [key: string]: unknown;
}

export interface Permission {
  id: string;
  isAuthorized: boolean;
  geographies: unknown[];
  organizations: Organization[];
  [key: string]: unknown;
}

export interface AvPermissionsLike {
  getPermissions(ids: string[], region?: string): Promise<Permission[]>;
}

export interface AvRegionsLike {
  getCurrentRegion(): Promise<{ data?: { regions?: Array<{ id: string }> } }>;
}

declare class AvAuthorizations {
  constructor(avPermissions: AvPermissionsLike, avRegions: AvRegionsLike, promise: PromiseConstructor);

  avPermissions: AvPermissionsLike;

  avRegions: AvRegionsLike;

  promise: PromiseConstructor;

  authorizedMap: Record<string, Record<string, Permission>>;

  isAuthorized(permissionId: string, region?: string): Promise<boolean>;

  isAnyAuthorized(permissionIds: string[], region?: string): Promise<boolean>;

  getPermission(permissionId: string, region?: string): Promise<Permission>;

  getRegion(region?: string): Promise<string | undefined>;

  getPermissions(permissionIds: string[], region?: string): Promise<Permission[]>;

  getMissingIds(ids: string[], region?: string): string[];

  getFromMap(ids: string[], region?: string): Permission[];

  addPermissions(ids: string[], permissions: Permission[], region?: string): void;

  addPermission(permission: Partial<Permission> & { id: string }, region?: string): void;

  getOrganizations(permissionId: string, region?: string): Promise<Organization[]>;

  getPayers(permissionId: string, organizationId: string, region?: string): Promise<Resource[]>;
}

export default AvAuthorizations;
