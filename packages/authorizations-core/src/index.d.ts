/* eslint-disable @typescript-eslint/no-explicit-any */
declare class AvAuthorizations {
  constructor(avPermissions: any, avRegions: any, promise: any);

  avPermissions: any;

  avRegions: any;

  promise: any;

  authorizedMap: Record<string, unknown>;

  isAuthorized(permissionId: any, region: any): any;

  isAnyAuthorized(permissionIds: any, region: any): any;

  getPermission(permissionId: any, region: any): any;

  getRegion(region: any): any;

  getPermissions(permissionIds: any, region: any): any;

  getMissingIds(ids: any, region?: string): any;

  getFromMap(ids: any, region?: string): any;

  addPermissions(ids: any, permissions: any, region: any): void;

  addPermission(permission: any, region?: string): void;

  getOrganizations(permissionId: any, region: any): any;

  getPayers(permissionId: any, organizationId: any, region: any): any;
}

export default AvAuthorizations;
