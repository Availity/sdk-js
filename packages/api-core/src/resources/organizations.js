import qs from 'qs';
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
      const { permissionIds } = additionalPostGetArgs;
      if (permissionIds) {
        if (typeof data === 'string') {
          const dataTemp = qs.parse(data);
          dataTemp.permissionId = permissionIds;
          data = qs.stringify(dataTemp, { arrayFormat: 'repeat' });
        } else if (typeof data === 'object') {
          data.permissionId = permissionIds;
        }
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
    const { resourceIds = [], permissionIds } = additionalPostGetArgs;
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
      typeof permissionIdsToUse !== 'number' &&
      !Array.isArray(permissionIdsToUse)
    ) {
      throw new TypeError(
        'permissionId(s) must be either an array of ids, a string, or a number'
      );
    }
    if (
      typeof resourceIds !== 'string' &&
      typeof resourceIds !== 'number' &&
      !Array.isArray(resourceIds)
    ) {
      throw new TypeError(
        'resourceIds must be either an array of ids, a string, or a number'
      );
    }

    // resourceIds is passed as readOnly, convert so that we can use Array methods on it
    const resourceIdsArray = Array.isArray(resourceIds)
      ? resourceIds
      : [`${resourceIds}`];

    const permissionIdsOR = Array.isArray(permissionIdsToUse)
      ? permissionIdsToUse
      : [`${permissionIdsToUse}`];

    if (
      region !== this.previousRegionId ||
      !this.arePermissionsEqual(permissionIdsOR)
    ) {
      // avUserPermissions will return a list of user organizations that match given permission and region
      // This call does not need to be paginated and
      // we should not need to call it every time we paginate orgs if region and permissions are the same
      // Limit is set to permissionId.length because that represents maximum results we can get back
      const {
        data: { axiUserPermissions: userPermissions },
      } = await this.avUserPermissions.postGet({
        permissionId: permissionIdsOR,
        region,
        limit: permissionIdsOR.length,
      });

      if (userPermissions) {
        this.userPermissions = userPermissions.reduce((accum, cur) => {
          accum[cur.id] = cur;
          return accum;
        }, {});
        this.previousPermissionIds = permissionIdsOR;
        this.previousRegionId = region;
      } else {
        throw new Error('avUserPermissions call failed');
      }
    }

    // loop thru the permissionId list of ORs, finding and adding matching orgs in the userPermissions. ANDs are beneath/within the ORs
    const authorizedOrgs = permissionIdsOR.reduce(
      (accum, permissionIdOR, permIndex) => {
        let matchedOrgs = {};
        if (Array.isArray(permissionIdOR)) {
          matchedOrgs = permissionIdOR.reduce(
            (matchedANDOrgs, permissionIdAND, index) => {
              const matchedOrgsTemp = this.findOrgsWithResources(
                this.userPermissions[`${permissionIdAND}`],
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
            this.userPermissions[`${permissionIdOR}`],
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
    permIndexOR,
    permIndexAND
  ) {
    const matchedOrgs = {};

    if (permissionObject) {
      // the resource(s)
      const resourceIdsORForPermOR = resourceIdsArray[permIndexOR];
      permissionObject.organizations.forEach(organization => {
        if (Array.isArray(resourceIdsORForPermOR)) {
          let resourceIdsORForPermAND = resourceIdsORForPermOR;
          if (permIndexAND !== undefined) {
            // adjust for nested AND permission
            resourceIdsORForPermAND = resourceIdsORForPermOR[permIndexAND];
          }
          if (Array.isArray(resourceIdsORForPermAND)) {
            // array of multiple resources in one means AND them
            if (Array.isArray(resourceIdsORForPermAND[0])) {
              const isMatch = resourceIdsORForPermAND[0].every(resourceId =>
                organization.resources.some(
                  resource => `${resource.id}` === `${resourceId}`
                )
              );
              if (isMatch) {
                matchedOrgs[organization.id] = organization;
              }
              // otherwise OR them
            } else {
              const isMatch = resourceIdsORForPermAND.some(resourceId =>
                organization.resources.some(
                  resource => `${resource.id}` === `${resourceId}`
                )
              );
              if (isMatch) {
                matchedOrgs[organization.id] = organization;
              }
            }
            // a single OR resource doesn't need to be in an array
          } else {
            const isMatch = organization.resources.some(
              resource => `${resource.id}` === `${resourceIdsORForPermAND}`
            );
            if (isMatch) {
              matchedOrgs[organization.id] = organization;
            }
          }
        } else {
          // check for the one resource
          const isMatch = organization.resources.some(
            resource => `${resource.id}` === `${resourceIdsORForPermOR}`
          );
          if (isMatch || !resourceIdsORForPermOR) {
            matchedOrgs[organization.id] = organization;
          }
        }
      });
    }
    return matchedOrgs;
  }

  arePermissionsEqual(permissionId) {
    // handle nested arrays by collecting all permission values for both new and previous, then Set-ing them
    const permissionArray = [];
    if (typeof permissionId === 'string' || typeof permissionId === 'number') {
      permissionArray.push(`${permissionId}`);
    } else if (Array.isArray(permissionId)) {
      permissionId.forEach(permissionOR => {
        if (Array.isArray(permissionOR)) {
          permissionOR.forEach(permissionAND => {
            permissionArray.push(`${permissionAND}`);
          });
        } else {
          permissionArray.push(`${permissionOR}`);
        }
      });
    }

    const prevPermissionArray = [];
    if (
      typeof this.previousPermissionIds === 'string' ||
      typeof this.previousPermissionIds === 'number'
    ) {
      prevPermissionArray.push(`${this.previousPermissionIds}`);
    } else if (Array.isArray(this.previousPermissionIds)) {
      this.previousPermissionIds.forEach(permissionOR => {
        if (Array.isArray(permissionOR)) {
          permissionOR.forEach(permissionAND => {
            prevPermissionArray.push(`${permissionAND}`);
          });
        } else {
          prevPermissionArray.push(`${permissionOR}`);
        }
      });
    }

    const idSet = new Set([...permissionArray]);
    const idSetCombined = new Set([...permissionArray, ...prevPermissionArray]);

    return idSet.size === idSetCombined.size;
  }
}
