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
    if (additionalPostGetArgs && additionalPostGetArgs.resourceIds) {
      const { permissionIds } = additionalPostGetArgs;
      if (permissionIds) {
        data.permissionId = permissionIds;
      }
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
    // for filtered orgs, can pass both permissions and resources in postGetArgs, and we will use the permissionIds here over the data.permissionId
    const { resourceIds, permissionIds } = additionalPostGetArgs;
    const { permissionId, region } = data;
    const {
      organizations,
      limit: orgLimit,
      offset: orgOffset,
      totalCount: totalOrgCount,
    } = organizationsData;

    const permissionIdsToUse = permissionIds || permissionId;
    if (
      typeof permissionIdsToUse !== 'string' &&
      !Array.isArray(permissionIdsToUse)
    ) {
      throw new TypeError(
        'permissionId(s) must be either an array of ids or a string'
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
      !this.arePermissionsEqual(permissionIdsToUse)
    ) {
      // avUserPermissions will return a list of user organizations that match given permission and region
      // This call does not need to be paginated and
      // we should not need to call it every time we paginate orgs if region and permissions are the same
      // Limit is set to permissionId.length because that represents maximum results we can get back
      const {
        data: { axiUserPermissions: userPermissions },
      } = await this.avUserPermissions.postGet({
        permissionIdsToUse,
        region,
        limit: permissionIdsToUse.length,
      });

      if (userPermissions) {
        this.userPermissions = userPermissions.reduce((accum, cur) => {
          accum[cur.id] = cur;
          return accum;
        }, {});
        this.previousPermissionIds = permissionIdsToUse;
        this.previousRegionId = region;
      } else {
        throw new Error('avUserPermissions call failed');
      }
    }

    // loop thru the permissionId list of ORs, finding and adding matching orgs in the userPermissions. ANDs are beneath/within the ORs
    const permissionIdsOR = Array.isArray(permissionIdsToUse)
      ? permissionIdsToUse
      : [permissionIdsToUse];
    const authorizedOrgs = permissionIdsOR.reduce(
      (accum, permissionIdOR, permIndex) => {
        let matchedOrgs = {};
        if (Array.isArray(permissionIdOR)) {
          matchedOrgs = permissionIdOR.reduce(
            (matchedANDOrgs, permissionIdAND, index) => {
              const matchedOrgsTemp = this.findOrgsWithResources(
                this.userPermissions[permissionIdAND],
                resourceIdsArray,
                permIndex,
                index
              );
              if (index === 0) {
                Object.keys(matchedOrgsTemp).forEach(orgId => {
                  matchedANDOrgs[orgId] = matchedOrgsTemp[orgId];
                });
              } else {
                // AND the perms in this list
                Object.keys(matchedANDOrgs).forEach(orgId => {
                  if (!matchedOrgsTemp[orgId]) {
                    // one of the orgs does not have a required permission
                    matchedANDOrgs[orgId] = undefined;
                  }
                });
              }
              return matchedANDOrgs;
            },
            {}
          );
        } else {
          // just one permission, get the orgs under this permission
          matchedOrgs = this.findOrgsWithResources(
            this.userPermissions[permissionIdOR],
            resourceIdsArray,
            permIndex
          );
        }
        Object.keys(matchedOrgs).forEach(orgId => {
          if (!accum[orgId]) {
            accum[orgId] = matchedOrgs[orgId];
          }
        });
        return accum;
      },
      {}
    );

    // avUserPermissions call doesn't return much useful organization data
    // but we can match valid ids to useful data returned from avOrganizations
    const authorizedFilteredOrgs = organizations.filter(
      org => authorizedOrgs[org.id]
      // authorizedOrgs.some((authorizedOrg) => authorizedOrg.id === org.id)
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

  findOrgsWithResources(
    permissionObject,
    resourceIdsArray,
    permIndex,
    resIndex
  ) {
    const matchedOrgs = {};

    if (permissionObject) {
      // the resource(s)
      const resourceIdsPerm = resourceIdsArray[permIndex];
      permissionObject.organizations.forEach(organization => {
        if (Array.isArray(resourceIdsPerm)) {
          const resourceIdsPermAnd = resourceIdsPerm[resIndex];
          if (Array.isArray(resourceIdsPermAnd)) {
            // check for EVERY resource
            const isMatch = resourceIdsPermAnd.every(resourceId =>
              organization.resources.some(
                resource => `${resource.id}` === resourceId
              )
            );
            if (isMatch) {
              matchedOrgs[organization.id] = organization;
            }
          } else {
            const isMatch = organization.resources.some(
              resource => `${resource.id}` === resourceIdsPermAnd
            );
            if (isMatch) {
              matchedOrgs[organization.id] = organization;
            }
          }
        } else {
          // check for the one resource
          const isMatch = organization.resources.some(
            resource => `${resource.id}` === resourceIdsPerm
          );
          if (isMatch) {
            matchedOrgs[organization.id] = organization;
          }
        }
      });
    }
    return matchedOrgs;
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
