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
    if (typeof data === 'string') {
      data = qs.parse(data);
    }
    const { permissionId, region } = data;
    const {
      organizations,
      limit: orgLimit,
      offset: orgOffset,
      totalCount: totalOrgCount,
    } = organizationsData;

    let permissionIdsToUse = permissionIds || permissionId;
    permissionIdsToUse = this.sanitizeIds(permissionIdsToUse);
    const resourceIdsToUse = this.sanitizeIds(resourceIds);

    // resourceIds is passed as readOnly, convert so that we can use Array methods on it
    const resourceIdsArray = Array.isArray(resourceIdsToUse)
      ? resourceIdsToUse
      : [resourceIdsToUse];

    const permissionIdsOR = Array.isArray(permissionIdsToUse)
      ? permissionIdsToUse
      : [permissionIdsToUse];

    if (
      region !== this.previousRegionId ||
      !this.arePermissionsEqual(permissionIdsOR)
    ) {
      // avUserPermissions will return a list of user organizations that match given permission and region
      // This call does not need to be paginated and
      // we should not need to call it every time we paginate orgs if region and permissions are the same
      const {
        data: { axiUserPermissions: userPermissions },
      } = await this.avUserPermissions.postGet({
        permissionId: permissionIdsOR,
        region,
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
    const authorizedOrgs = permissionIdsOR.reduce((accum, permissionIdOR) => {
      if (Array.isArray(permissionIdOR)) {
        const matchedOrgs = permissionIdOR.reduce(
          (matchedANDOrgsByPerm, permissionIdAND, index) => {
            if (this.userPermissions[permissionIdAND]) {
              this.userPermissions[permissionIdAND].organizations.forEach(
                org => {
                  if (index === 0) {
                    // add the orgs for the first permission
                    matchedANDOrgsByPerm[org.id] = org;
                  } else if (matchedANDOrgsByPerm[org.id]) {
                    // if duplicate, add resources
                    matchedANDOrgsByPerm[
                      org.id
                    ].resources = matchedANDOrgsByPerm[org.id].resources.concat(
                      org.resources
                    );
                  }
                }
              );
            }
            // filter unmatched orgs out
            matchedANDOrgsByPerm = Object.keys(matchedANDOrgsByPerm)
              .filter(orgId => {
                if (this.userPermissions[permissionIdAND]) {
                  return this.userPermissions[
                    permissionIdAND
                  ].organizations.some(org => org.id === orgId);
                }
                return false;
              })
              .reduce((obj, orgId) => {
                obj[orgId] = matchedANDOrgsByPerm[orgId];
                return obj;
              }, {});

            return matchedANDOrgsByPerm;
          },
          {}
        );
        Object.keys(matchedOrgs).forEach(orgId => {
          if (!accum[orgId]) {
            accum[orgId] = matchedOrgs[orgId];
            accum[orgId].match = false;
          }
        });
      } else if (this.userPermissions[permissionIdOR]) {
        this.userPermissions[permissionIdOR].organizations.forEach(org => {
          if (!accum[org.id]) {
            accum[org.id] = org;
            accum[org.id].match = false;
          } else {
            // add the resources
            accum[org.id].resources = accum[org.id].resources.concat(
              org.resources
            );
          }
        });
      }
      return accum;
    }, {});

    // loop thru the orgs from permission filtering and check resourceIds list to further filter
    if (resourceIdsArray.length === 0) {
      Object.keys(authorizedOrgs).forEach(orgId => {
        authorizedOrgs[orgId].match = true;
      });
    } else {
      resourceIdsArray.forEach(resourceIdOR => {
        if (Array.isArray(resourceIdOR)) {
          // there is AND logic
          Object.keys(authorizedOrgs).forEach(orgId => {
            if (authorizedOrgs[orgId]) {
              const isMatch = resourceIdOR.every(resId =>
                authorizedOrgs[orgId].resources.some(res => res.id === resId)
              );
              if (isMatch) {
                authorizedOrgs[orgId].match = true;
              }
            }
          });
        } else {
          Object.keys(authorizedOrgs).forEach(orgId => {
            const isMatch = authorizedOrgs[orgId].resources.some(
              res => res.id === resourceIdOR
            );
            if (isMatch || !resourceIdOR) {
              authorizedOrgs[orgId].match = true;
            }
          });
        }
      }, {});
    }

    // avUserPermissions call doesn't return much useful organization data
    // but we can match valid ids to useful data returned from avOrganizations
    const authorizedFilteredOrgs = organizations.filter(org =>
      Object.keys(authorizedOrgs).some(
        orgId =>
          authorizedOrgs[orgId] &&
          authorizedOrgs[orgId].match &&
          orgId === org.id
      )
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
    // handle nested arrays by collecting all permission values for both new and previous, then Set-ing them
    const permissionArray = [];
    if (typeof permissionId === 'string' || typeof permissionId === 'number') {
      permissionArray.push(permissionId);
    } else if (Array.isArray(permissionId)) {
      permissionId.forEach(permissionOR => {
        if (Array.isArray(permissionOR)) {
          permissionOR.forEach(permissionAND => {
            permissionArray.push(permissionAND);
          });
        } else {
          permissionArray.push(permissionOR);
        }
      });
    }

    const prevPermissionArray = [];
    if (
      typeof this.previousPermissionIds === 'string' ||
      typeof this.previousPermissionIds === 'number'
    ) {
      prevPermissionArray.push(this.previousPermissionIds);
    } else if (Array.isArray(this.previousPermissionIds)) {
      this.previousPermissionIds.forEach(permissionOR => {
        if (Array.isArray(permissionOR)) {
          permissionOR.forEach(permissionAND => {
            prevPermissionArray.push(permissionAND);
          });
        } else {
          prevPermissionArray.push(permissionOR);
        }
      });
    }

    const idSet = new Set([...permissionArray]);
    const idSetCombined = new Set([...permissionArray, ...prevPermissionArray]);

    return idSet.size === idSetCombined.size;
  }

  sanitizeIds(unsanitized) {
    if (typeof unsanitized === 'string') {
      return unsanitized;
    }
    if (typeof unsanitized === 'number') {
      return `${unsanitized}`;
    }
    if (Array.isArray(unsanitized)) {
      return unsanitized.map(dirty => this.sanitizeIds(dirty));
    }
    throw new TypeError(
      'permission/resourcesId(s) must be either an array of ids, a string, or a number'
    );
  }
}
