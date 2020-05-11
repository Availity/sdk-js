import AvApi from '../api';

export default class AvOrganizations extends AvApi {
  constructor({ http, promise, merge, avUsers, avUserPermissions, config }) {
    const options = {
      path: 'api/sdk/platform',
      name: 'organizations',
      ...config,
    };
    super({
      http,
      promise,
      merge,
      config: options,
    });

    this.avUsers = avUsers;
    this.avUserPermissions = avUserPermissions;
  }

  // Instance variables to help with caching for filtered organizations
  previousPermissionIds = [];

  previousRegionId = '';

  userPermissions = [];

  queryOrganizations(user, config) {
    const queryConfig = this.addParams({ userId: user.id }, config);
    return this.query(queryConfig);
  }

  getOrganizations(config) {
    if (config && config.params && config.params.userId) {
      return this.query(config);
    }

    if (!this.avUsers || !this.avUsers.me) {
      throw new Error('avUsers must be defined');
    }

    return this.avUsers
      .me()
      .then(user => this.queryOrganizations(user, config));
  }

  async postGet(data, config, additionalPostGetArgs) {
    if (additionalPostGetArgs) {
      const { data: organizationsData } = await super.postGet(data, config);

      return this.getFilteredOrganizations(
        organizationsData,
        additionalPostGetArgs,
        data
      );
    }

    // Else return normal organizations call
    return super.postGet(data, config);
  }

  async getFilteredOrganizations(
    organizationsData,
    additionalPostGetArgs,
    data
  ) {
    const { resourceIds } = additionalPostGetArgs;
    const { permissionId, region } = data;
    const {
      organizations,
      limit: orgLimit,
      offset: orgOffset,
      totalCount: totalOrgCount,
    } = organizationsData;

    if (typeof permissionId !== 'string' && !Array.isArray(permissionId)) {
      throw new TypeError(
        'permissionId must be either an array of ids or a string'
      );
    }
    if (typeof resourceIds !== 'string' && !Array.isArray(resourceIds)) {
      throw new TypeError(
        'resourceIds must be either an array of ids or a string'
      );
    }

    // resourceIds is passed as readOnly, convert so that we can use Array methods on it
    const resourceIdsArray =
      typeof resourceIds === 'string' ? [resourceIds] : resourceIds;

    if (
      region !== this.previousRegionId ||
      !this.arePermissionsEqual(permissionId)
    ) {
      // avUserPermissions will return a list of user organizations that match given permission and region
      // This call does not need to be paginated and
      // we should not need to call it every time we paginate orgs if region and permissions are the same
      // Limit is set to permissionId.length because that represents maximum results we can get back
      const {
        data: { axiUserPermissions: userPermissions },
      } = await this.avUserPermissions.postGet({
        permissionId,
        region,
        limit: permissionId.length,
      });

      if (userPermissions) {
        this.userPermissions = userPermissions;
        this.previousPermissionIds = permissionId;
        this.previousRegionId = region;
      } else {
        throw new Error('avUserPermissions call failed');
      }
    }

    // Reduce the userPermissions result into a collection of orgs that contain a valid resource
    const authorizedOrgs = this.userPermissions.reduce(
      (accum, userPermission) => {
        userPermission.organizations.forEach(userOrg => {
          const isDuplicate = accum.some(item => item.id === userOrg.id);
          if (!isDuplicate) {
            // If this org contains one of the passed in resourceIds, it is an authorized org
            const match = userOrg.resources.some(userResource => {
              return resourceIdsArray.some(
                resource => Number(resource) === Number(userResource.id)
              );
            });
            if (match) {
              accum.push({ id: userOrg.id });
            }
          }
        });

        return accum;
      },
      []
    );

    // avUserPermissions call doesn't return much useful organization data
    // but we can match valid ids to useful data returned from avOrganizations
    const authorizedFilteredOrgs = organizations.filter(org =>
      authorizedOrgs.some(authorizedOrg => authorizedOrg.id === org.id)
    );

    // Transform back into data object that ResourceSelect can use and paginate
    return {
      data: {
        authorizedFilteredOrgs,
        totalCount: totalOrgCount,
        limit: orgLimit,
        offset: orgOffset,
      },
    };
  }

  arePermissionsEqual(permissionId) {
    if (typeof permissionId !== typeof this.previousPermissionIds) return false;

    if (typeof permissionId === 'string')
      return permissionId === this.previousPermissionIds;

    if (
      Array.isArray(permissionId) &&
      Array.isArray(this.previousPermissionIds)
    ) {
      if (permissionId.length !== this.previousPermissionIds.length)
        return false;

      // if lengths are equal, need a way to check if values are the same or not
      // Sets won't allow duplicate values
      // if size of Set is greater than length of original arrays
      // then a different value was inserted and they are not equal
      const idSet = new Set([...permissionId], [...this.previousPermissionIds]);
      if (idSet.size !== permissionId.length) return false;

      return true;
    }

    return false;
  }
}
