class AvAuthorizations {
  constructor(avPermissions, avRegions, promise) {
    // make sure all params are passed in
    if (!avPermissions || !avRegions || !promise) {
      throw Error('A permission, region, and promise are required');
    }

    // save paramaters
    this.avPermissions = avPermissions;
    this.avRegions = avRegions;
    this.promise = promise;

    // initialize the map
    this.authorizedMap = {};
  }

  // return true/false if this permissionId is authorized in this region
  isAuthorized(permissionId, region) {
    return this.getPermission(permissionId, region).then(
      permission => permission.isAuthorized
    );
  }

  // return true/false if any of ther permissions in array are authorized in this region
  isAnyAuthorized(permissionIds, region) {
    return this.getPermissions(permissionIds, region).then(permissions =>
      permissions.some(permission => permission.isAuthorized)
    );
  }

  // gets the permission for this id in this region
  getPermission(permissionId, region) {
    if (typeof permissionId !== 'string') {
      return this.promise.reject('permissionId must be a string');
    }
    return this.getPermissions([permissionId], region).then(permissions =>
      permissions.find(permission => permission.id === permissionId)
    );
  }

  // if passed in region is undefined, use avRegions to get current region
  getRegion(region) {
    if (region) {
      return this.promise.resolve(region);
    }
    return this.avRegions
      .getCurrentRegion()
      .then(
        response =>
          response &&
          response.data &&
          response.data.regions &&
          response.data.regions[0] &&
          response.data.regions[0] &&
          response.data.regions[0].id
      );
  }
  // get all permissions in this region

  getPermissions(permissionIds, region) {
    // check permissionIds
    let throwError = !Array.isArray(permissionIds);
    if (!throwError) {
      throwError = permissionIds.some(id => typeof id !== 'string');
    }
    if (throwError) {
      return this.promise.reject('permissionIds must be an array of strings');
    }

    let useRegion;
    let neededIds = [];
    // get the region to use
    return this.getRegion(region)
      .then(response => {
        useRegion = response;
        // get ids still needed
        neededIds = this.getMissingIds(permissionIds, useRegion);
        if (neededIds && neededIds.length > 0) {
          return this.avPermissions.getPermissions(neededIds, useRegion);
        }
        return this.promise.resolve([]);
      })
      .then(permissions => {
        // add new permissions to the map
        this.addPermissions(neededIds, permissions, useRegion);
        // return the final results from the map
        return this.getFromMap(permissionIds, useRegion);
      });
  }

  // return ids that are not already in the map
  getMissingIds(ids, region = 'default') {
    return ids.reduce((output, id) => {
      if (!this.authorizedMap[id] || !this.authorizedMap[id][region]) {
        output.push(id);
      }
      return output;
    }, []);
  }

  // grab ids from map with region
  getFromMap(ids, region = 'default') {
    return ids.reduce((output, id) => {
      if (this.authorizedMap[id] && this.authorizedMap[id][region]) {
        output.push(this.authorizedMap[id][region]);
      }
      return output;
    }, []);
  }

  // add all ids permission object to map
  addPermissions(ids, permissions, region) {
    ids.forEach(id => {
      const permission = permissions.find(val => val.id === id);
      this.addPermission(permission || { id }, region);
    });
  }

  // add this permission to map
  addPermission(permission, region = 'default') {
    if (!permission.id) {
      return;
    }
    this.authorizedMap[permission.id] = this.authorizedMap[permission.id] || {};
    // set default values
    permission.geographies = permission.geographies || [];
    permission.organizations = permission.organizations || [];
    permission.isAuthorized = !!(
      permission.organizations.length && permission.organizations.length > 0
    );
    this.authorizedMap[permission.id][region] = permission;
  }

  getOrganizations(permissionId, region) {
    return this.getPermission(permissionId, region).then(
      permission => permission.organizations
    );
  }

  getPayers(permissionId, organizationId, region) {
    return this.getPermission(permissionId, region).then(permission => {
      const organization = permission.organizations.find(
        org => org.id === organizationId
      );
      return (organization && organization.resources) || [];
    });
  }
}

export default AvAuthorizations;
