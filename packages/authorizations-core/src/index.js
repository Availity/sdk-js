class AvAuthorizations {
  constructor(avPermissions, avRegions, promise) {
    if (!avPermissions || !avRegions || !promise) {
      throw new Error('A permission, region, and promise are required');
    }

    this.avPermissions = avPermissions;
    this.avRegions = avRegions;
    this.promise = promise;
    this.authorizedMap = {};
  }

  async isAuthorized(permissionId, region) {
    const permission = await this.getPermission(permissionId, region);
    return permission.isAuthorized;
  }

  async isAnyAuthorized(permissionIds, region) {
    const permissions = await this.getPermissions(permissionIds, region);
    return permissions.some((permission) => permission.isAuthorized);
  }

  async getPermission(permissionId, region) {
    if (typeof permissionId !== 'string') {
      throw new TypeError('permissionId must be a string');
    }
    const permissions = await this.getPermissions([permissionId], region);
    return permissions.find((permission) => permission.id === permissionId);
  }

  async getRegion(region) {
    if (region) {
      return region;
    }
    const response = await this.avRegions.getCurrentRegion();
    return response?.data?.regions?.[0]?.id;
  }

  async getPermissions(permissionIds, region) {
    if (!Array.isArray(permissionIds) || permissionIds.some((id) => typeof id !== 'string')) {
      throw new Error('permissionIds must be an array of strings');
    }

    const useRegion = await this.getRegion(region);
    const neededIds = this.getMissingIds(permissionIds, useRegion);

    if (neededIds.length > 0) {
      const permissions = await this.avPermissions.getPermissions(neededIds, useRegion);
      this.addPermissions(neededIds, permissions, useRegion);
    }

    return this.getFromMap(permissionIds, useRegion);
  }

  getMissingIds(ids, region = 'default') {
    return ids.filter((id) => !this.authorizedMap[id]?.[region]);
  }

  getFromMap(ids, region = 'default') {
    return ids.reduce((output, id) => {
      if (this.authorizedMap[id]?.[region]) {
        output.push(this.authorizedMap[id][region]);
      }
      return output;
    }, []);
  }

  addPermissions(ids, permissions, region) {
    for (const id of ids) {
      const permission = permissions.find((val) => val.id === id);
      this.addPermission(permission || { id }, region);
    }
  }

  addPermission(permission, region = 'default') {
    if (!permission.id) {
      return;
    }
    this.authorizedMap[permission.id] = this.authorizedMap[permission.id] || {};
    permission.geographies = permission.geographies || [];
    permission.organizations = permission.organizations || [];
    permission.isAuthorized = permission.organizations.length > 0;
    this.authorizedMap[permission.id][region] = permission;
  }

  async getOrganizations(permissionId, region) {
    const permission = await this.getPermission(permissionId, region);
    return permission.organizations;
  }

  async getPayers(permissionId, organizationId, region) {
    const permission = await this.getPermission(permissionId, region);
    const organization = permission.organizations.find((org) => org.id === organizationId);
    return organization?.resources || [];
  }
}

export default AvAuthorizations;
