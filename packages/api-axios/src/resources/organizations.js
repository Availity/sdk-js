import qs from 'qs';

import AvApi from '../api';
import { avUserApi } from './user';
import { avUserPermissionsApi } from './userPermissions';

export default class AvOrganizationsApi extends AvApi {
  constructor(config) {
    super({
      path: 'api/sdk/platform',
      name: 'organizations',
      ...config,
    });
  }

  // Instance variables to help with caching for filtered organizations
  previousPermissionIds = [];

  previousRegionId = '';

  userPermissions = [];

  async queryOrganizations(user, config) {
    const queryConfig = this.addParams({ userId: user.id }, config);
    return this.query(queryConfig);
  }

  async getOrganizations(config) {
    if (config?.params?.userId) {
      return this.query(config);
    }

    const user = await avUserApi.me();

    return this.queryOrganizations(user, config);
  }

  async postGet(data, config, additionalPostGetArgs) {
    if (additionalPostGetArgs) {
      this.region = undefined;

      const { permissionIds } = additionalPostGetArgs;
      if (typeof data === 'string') {
        const dataTemp = qs.parse(data);
        const { region } = dataTemp;
        if (region) {
          this.region = region;
          delete dataTemp.region;
        }
        if (permissionIds) {
          dataTemp.permissionId = permissionIds;
        }
        data = qs.stringify(dataTemp, { arrayFormat: 'repeat' });
      } else if (typeof data === 'object') {
        const { region } = data;
        if (region) {
          this.region = region;
          delete data.region;
        }
        if (permissionIds) {
          data.permissionId = permissionIds;
        }
      }
      const { data: organizationsData } = await super.postGet(data, config);
      const { organizations, limit, offset, totalCount } = organizationsData;

      const authorizedOrgs = await this.getFilteredOrganizations(additionalPostGetArgs, data);

      // avUserPermissions call doesn't return much useful organization data
      // but we can match valid ids to useful data returned from avOrganizations
      const authorizedFilteredOrgs = organizations.filter((org) =>
        authorizedOrgs.some((authOrg) => authOrg.id === org.id)
      );

      // Transform back into data object that ResourceSelect can use and paginate
      return {
        data: {
          authorizedFilteredOrgs,
          totalCount,
          limit,
          offset,
        },
      };
    }

    // Else return normal organizations call
    return super.postGet(data, config);
  }

  async getFilteredOrganizations(additionalPostGetArgs, data) {
    // for filtered orgs, can pass both permissions and resources in postGetArgs, and we will use the permissionIds here over the data.permissionId
    const { resourceIds = [], permissionIds } = additionalPostGetArgs;
    if (typeof data === 'string') {
      data = qs.parse(data);
    }
    const { permissionId } = data;

    let permissionIdsToUse = permissionIds || permissionId;
    permissionIdsToUse = this.sanitizeIds(permissionIdsToUse);
    const resourceIdsToUse = this.sanitizeIds(resourceIds);

    // resourceIds is passed as readOnly, convert so that we can use Array methods on it
    const resourceIdsArray = Array.isArray(resourceIdsToUse) ? resourceIdsToUse : [resourceIdsToUse];

    const permissionIdsOR = Array.isArray(permissionIdsToUse) ? permissionIdsToUse : [permissionIdsToUse];

    if (this.region !== this.previousRegionId || !this.arePermissionsEqual(permissionIdsOR)) {
      // avUserPermissions will return a list of user organizations that match given permission and region
      // This call does not need to be paginated and
      // we should not need to call it every time we paginate orgs if region and permissions are the same
      const {
        data: { axiUserPermissions: userPermissions },
      } = await avUserPermissionsApi.postGet({
        permissionId: permissionIdsOR,
        region: this.region,
      });

      if (userPermissions) {
        this.userPermissions = userPermissions.reduce((accum, cur) => {
          accum[cur.id] = cur;
          return accum;
        }, {});
        this.previousPermissionIds = permissionIdsOR;
        this.previousRegionId = this.region;
      } else {
        throw new Error('avUserPermissions call failed');
      }
    }

    // loop thru the permissionId list of ORs, finding and adding matching orgs in the userPermissions. ANDs are beneath/within the ORs
    const authorizedOrgs = permissionIdsOR.reduce((accum, permissionIdOR) => {
      if (Array.isArray(permissionIdOR)) {
        const matchedOrgs = permissionIdOR.reduce((matchedANDOrgsByPerm, permissionIdAND, index) => {
          if (this.userPermissions[permissionIdAND]) {
            for (const org of this.userPermissions[permissionIdAND].organizations) {
              if (index === 0) {
                // add the orgs for the first permission
                matchedANDOrgsByPerm[org.id] = org;
              } else if (matchedANDOrgsByPerm[org.id]) {
                // if duplicate, add resources
                matchedANDOrgsByPerm[org.id].resources = [...matchedANDOrgsByPerm[org.id].resources, ...org.resources];
              }
            }
          }
          // filter unmatched orgs out
          matchedANDOrgsByPerm = Object.keys(matchedANDOrgsByPerm)
            .filter((orgId) => {
              if (this.userPermissions[permissionIdAND]) {
                return this.userPermissions[permissionIdAND].organizations.some((org) => org.id === orgId);
              }
              return false;
            })
            .reduce((obj, orgId) => {
              obj[orgId] = matchedANDOrgsByPerm[orgId];
              return obj;
            }, {});

          return matchedANDOrgsByPerm;
        }, {});
        for (const orgId of Object.keys(matchedOrgs)) {
          if (!accum[orgId]) {
            accum[orgId] = matchedOrgs[orgId];
            accum[orgId].match = false;
          }
        }
      } else if (this.userPermissions[permissionIdOR]) {
        for (const org of this.userPermissions[permissionIdOR].organizations) {
          if (!accum[org.id]) {
            accum[org.id] = org;
            accum[org.id].match = false;
          } else {
            // add the resources
            accum[org.id].resources = [...accum[org.id].resources, ...org.resources];
          }
        }
      }
      return accum;
    }, {});

    // loop thru the orgs from permission filtering and check resourceIds list to further filter
    if (resourceIdsArray.length === 0) {
      for (const orgId of Object.keys(authorizedOrgs)) {
        authorizedOrgs[orgId].match = true;
      }
    } else {
      // TODO: fix test when refactoring to for...of
      // eslint-disable-next-line unicorn/no-array-for-each
      resourceIdsArray.forEach((resourceIdOR) => {
        if (Array.isArray(resourceIdOR)) {
          // there is AND logic
          for (const orgId of Object.keys(authorizedOrgs)) {
            if (authorizedOrgs[orgId]) {
              const isMatch = resourceIdOR.every((resId) =>
                authorizedOrgs[orgId].resources.some((res) => res.id === resId)
              );
              if (isMatch) {
                authorizedOrgs[orgId].match = true;
              }
            }
          }
        } else {
          for (const orgId of Object.keys(authorizedOrgs)) {
            const isMatch = authorizedOrgs[orgId].resources.some((res) => res.id === resourceIdOR);
            if (isMatch || !resourceIdOR) {
              authorizedOrgs[orgId].match = true;
            }
          }
        }
      }, {});
    }

    return Object.keys(authorizedOrgs).reduce((accum, orgId) => {
      if (authorizedOrgs[orgId].match) {
        accum.push(authorizedOrgs[orgId]);
      }
      return accum;
    }, []);
  }

  arePermissionsEqual(permissionId) {
    // handle nested arrays by collecting all permission values for both new and previous, then Set-ing them
    const permissionArray = [];
    if (typeof permissionId === 'string' || typeof permissionId === 'number') {
      permissionArray.push(permissionId);
    } else if (Array.isArray(permissionId)) {
      for (const permissionOR of permissionId) {
        if (Array.isArray(permissionOR)) {
          for (const permissionAND of permissionOR) {
            permissionArray.push(permissionAND);
          }
        } else {
          permissionArray.push(permissionOR);
        }
      }
    }

    const prevPermissionArray = [];
    if (typeof this.previousPermissionIds === 'string' || typeof this.previousPermissionIds === 'number') {
      prevPermissionArray.push(this.previousPermissionIds);
    } else if (Array.isArray(this.previousPermissionIds)) {
      for (const permissionOR of this.previousPermissionIds) {
        if (Array.isArray(permissionOR)) {
          for (const permissionAND of permissionOR) {
            prevPermissionArray.push(permissionAND);
          }
        } else {
          prevPermissionArray.push(permissionOR);
        }
      }
    }

    const idSet = new Set([...permissionArray]);
    const idSetPrev = new Set([...prevPermissionArray]);
    const idSetCombined = new Set([...permissionArray, ...prevPermissionArray]);

    return idSet.size === idSetPrev.size && idSet.size === idSetCombined.size;
  }

  sanitizeIds(unsanitized) {
    if (typeof unsanitized === 'string') {
      return unsanitized;
    }
    if (typeof unsanitized === 'number') {
      return `${unsanitized}`;
    }
    if (Array.isArray(unsanitized)) {
      return unsanitized.map((dirty) => this.sanitizeIds(dirty));
    }
    throw new TypeError('permission/resourcesId(s) must be either an array of ids, a string, or a number');
  }
}

export const avOrganizationsApi = new AvOrganizationsApi();
