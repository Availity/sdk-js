/* global jest, describe, beforeEach, test, expect */

import { AvAuthorizations } from './index';

expect.extend({
  toBeAuthorized(permissions, ids) {
    const permissionArray = Array.isArray(permissions);
    const idsArray = Array.isArray(ids);
    // make sure both args are arrays
    let isPass = permissionArray && idsArray;
    if (!isPass) {
      return {
        pass: this.isNot,
        message: () => {
          let output = 'recieved ';
          if (idsArray) {
            output += `ids (${this.utils.printExpected(ids)})`;
          }
          if (idsArray && permissionArray) {
            output += ' and ';
          }
          if (permissionArray) {
            output += `permissions (${this.utils.printReceived(permissions)})`;
          }
          if (idsArray || permissionArray) {
            output += ' expected arrays';
          }
          return output;
        },
      };
    }
    // check all the ids against provided permissions, testing isAuthorized against isNot
    isPass = ids.every(id => {
      const permission = permissions.find(val => val.id === id);
      return permission && permission.isAuthorized === !this.isNot;
    });
    return {
      pass: isPass ? !this.isNot : this.isNot,
      message: () => {
        return `expected ids (${this.utils.printExpected(ids)}) to ${
          this.isNot ? ' not ' : ''
        } have isAuthorized in permissions (${this.utils.printReceived(
          permissions
        )})`;
      },
    };
  },
});

function authorizedMockPermissions(permissionIds) {
  return permissionIds.map(id => {
    return {
      id,
      organizations: [{ id: 'testOrg', resources: 'testResources' }],
    };
  });
}

function unauthorizedMockPermissions(permissionIds) {
  return permissionIds.map(id => {
    return { id };
  });
}

function getMockPermissionValues(permissionIds, isAuthorized) {
  return permissionIds.map(id => {
    const output = {
      id,
      isAuthorized,
      geographies: [],
      organizations: [],
    };
    if (isAuthorized) {
      output.organizations.push({ id: 'testOrg', resources: 'testResources' });
    }
    return output;
  });
}

const mockPermissions = {
  getPermissions: jest.fn(authorizedMockPermissions),
};

const mockRegion = 'FL';
const mockRegions = {
  getCurrentRegion: jest.fn(() => {
    return Promise.resolve({
      data: {
        regions: [
          {
            id: mockRegion,
          },
        ],
      },
    });
  }),
};

describe('AvAuthorizations', () => {
  let TestAuthorizations;

  beforeEach(() => {
    TestAuthorizations = new AvAuthorizations(
      mockPermissions,
      mockRegions,
      Promise
    );
  });

  test('AvAuthorizations is defined', () => {
    expect(TestAuthorizations).toBeDefined();
  });

  test('AvAuthorizations throws error when constructed without all params', () => {
    expect(() => {
      TestAuthorizations = new AvAuthorizations();
    }).toThrowError('A permission, region, and promise are required');
  });

  describe('Add permissions to map', () => {
    test('permission should be added to map in default region', () => {
      const testPermission = {
        id: 'testId',
      };
      TestAuthorizations.addPermission(testPermission);
      expect(
        TestAuthorizations.authorizedMap[testPermission.id].default.id
      ).toBe(testPermission.id);
    });

    test('permission should be given default geographies and organizations values', () => {
      const testPermission = {
        id: 'testId',
      };
      TestAuthorizations.addPermission(testPermission);
      const authorizedMapVal =
        TestAuthorizations.authorizedMap[testPermission.id];
      expect(authorizedMapVal.default.id).toBe(testPermission.id);
      expect(authorizedMapVal.default.geographies).toEqual([]);
      expect(authorizedMapVal.default.organizations).toEqual([]);
    });

    test('permission should not be authorized without any organization', () => {
      const testPermission = {
        id: 'testId',
      };
      TestAuthorizations.addPermission(testPermission);
      const authorizedMapVal =
        TestAuthorizations.authorizedMap[testPermission.id];
      expect(authorizedMapVal.default.id).toBe(testPermission.id);
      expect(authorizedMapVal.default.isAuthorized).toBeFalsy();
    });

    test('permission should be authorized when it has organizations', () => {
      const testPermission = {
        id: 'testId',
        organizations: ['someOrganization'],
      };
      TestAuthorizations.addPermission(testPermission);
      const authorizedMapVal =
        TestAuthorizations.authorizedMap[testPermission.id];
      expect(authorizedMapVal.default.id).toBe(testPermission.id);
      expect(authorizedMapVal.default.isAuthorized).toBeTruthy();
    });

    test('permission should be stored by region when one is provided', () => {
      const testId = 'testId';
      const testPermissionFl = {
        id: testId,
        geographies: ['FL'],
      };
      const testPermissionGa = {
        id: testId,
        geographies: ['GA'],
      };
      TestAuthorizations.addPermission(testPermissionFl, 'FL');
      TestAuthorizations.addPermission(testPermissionGa, 'GA');
      expect(TestAuthorizations.authorizedMap[testId].FL.id).toBe(testId);
      expect(TestAuthorizations.authorizedMap[testId].FL.geographies).toEqual(
        testPermissionFl.geographies
      );
      expect(TestAuthorizations.authorizedMap[testId].GA.id).toBe(testId);
      expect(TestAuthorizations.authorizedMap[testId].GA.geographies).toEqual(
        testPermissionGa.geographies
      );
    });

    test('should do nothing when permission has no id', () => {
      TestAuthorizations.addPermission({});
      expect(TestAuthorizations.authorizedMap).toEqual({});
    });
  });

  test('getRegion should return given region', () => {
    const testRegion = 'GA';
    return TestAuthorizations.getRegion(testRegion).then(region => {
      expect(region).toBe(testRegion);
    });
  });

  test('getRegion should use region api when no region is given', () => {
    return TestAuthorizations.getRegion().then(region => {
      expect(mockRegions.getCurrentRegion).toBeCalled();
      expect(region).toBe(mockRegion);
    });
  });

  test('addPermissions adds each id to map', () => {
    const testId = 'testId';
    const ids = [testId];
    const permissions = [];
    TestAuthorizations.addPermissions(ids, permissions);
    expect(TestAuthorizations.authorizedMap[testId].default.id).toBe(testId);
  });

  test('addPermissions adds each id from permissions to map', () => {
    const ids = ['testId'];
    const permissions = [{ id: 'testId', testKey: 'testValue' }];
    TestAuthorizations.addPermissions(ids, permissions);
    expect(TestAuthorizations.authorizedMap[ids[0]].default).toEqual(
      permissions[0]
    );
  });

  test('getMissingIds should return ids of permissions not in map', () => {
    const allIds = ['123', '456', '789'];
    const addedIds = ['789'];
    const testIds = ['123', '456'];
    TestAuthorizations.addPermissions(addedIds, []);
    expect(TestAuthorizations.getMissingIds(allIds)).toEqual(testIds);
  });

  test('getMissingIds should return ids of permissions not in map accounting for region', () => {
    const allIds = ['123', '456', '789'];
    const addedIds = ['789'];
    const testIds = ['123', '456'];
    const region1 = 'FL';
    const region2 = 'GA';
    TestAuthorizations.addPermissions(allIds, [], region1);
    TestAuthorizations.addPermissions(addedIds, [], region2);
    expect(TestAuthorizations.getMissingIds(allIds, region2)).toEqual(testIds);
  });

  test('getFromMap should return permissions with ids in map', () => {
    const allIds = ['123', '456', '789'];
    const addedIds = ['789'];
    TestAuthorizations.addPermissions(addedIds, []);
    expect(TestAuthorizations.getFromMap(allIds)).toEqual(
      getMockPermissionValues(addedIds, false)
    );
  });

  test('getFromMap should return permissions with ids in map based on region', () => {
    const allIds = ['123', '456', '789'];
    const addedIds = ['789'];
    const region1 = 'FL';
    const region2 = 'GA';
    TestAuthorizations.addPermissions(allIds, [], region1);
    TestAuthorizations.addPermissions(addedIds, [], region2);
    expect(TestAuthorizations.getFromMap(allIds, region2)).toEqual(
      getMockPermissionValues(addedIds, false)
    );
  });

  describe('Get Permissions', () => {
    test('Get permissions should call permission api', () => {
      const testIds = ['123', '456'];
      return TestAuthorizations.getPermissions(testIds).then(() => {
        expect(mockPermissions.getPermissions).toBeCalled();
      });
    });

    test('should return requested permissions with isAuthorized flag set', () => {
      const testIds = ['123', '456'];
      return TestAuthorizations.getPermissions(testIds).then(permissions => {
        expect(permissions).toBeAuthorized(testIds);
        expect(permissions).toEqual(getMockPermissionValues(testIds, true));
      });
    });

    test('should reject when a non-array is passed in', () => {
      const testIds = '123';
      return TestAuthorizations.getPermissions(testIds).catch(err => {
        expect(err).toBe('permissionIds must be an array of strings');
      });
    });

    test('should reject when passed in array is not all strings', () => {
      const testIds = ['123', 456];
      return TestAuthorizations.getPermissions(testIds).catch(err => {
        expect(err).toBe('permissionIds must be an array of strings');
      });
    });
  });

  test('getPermission should return single requested permission', () => {
    const testId = '123';
    const testRegion = 'GA';
    return TestAuthorizations.getPermission(testId, testRegion).then(
      permission => {
        expect(mockPermissions.getPermissions).lastCalledWith(
          [testId],
          testRegion
        );
        expect(permission).toEqual(getMockPermissionValues([testId], true)[0]);
      }
    );
  });

  test('getPermission should reject when a non-string is passed in', () => {
    const testId = 123;
    return TestAuthorizations.getPermission(testId).catch(err => {
      expect(err).toBe('permissionId must be a string');
    });
  });

  describe('Authorized', () => {
    test('should return true for authorized permission', done => {
      const testId = '123';
      const testRegion = 'GA';
      TestAuthorizations.isAuthorized(testId, testRegion).then(isAuthorized => {
        expect(mockPermissions.getPermissions).lastCalledWith(
          [testId],
          testRegion
        );
        expect(isAuthorized).toBeTruthy();
        done();
      });
    });

    test('should return false for unauthorized permission', done => {
      const testId = '123';
      const testRegion = 'GA';
      mockPermissions.getPermissions.mockImplementationOnce(
        unauthorizedMockPermissions
      );
      TestAuthorizations.isAuthorized(testId, testRegion).then(isAuthorized => {
        expect(mockPermissions.getPermissions).lastCalledWith(
          [testId],
          testRegion
        );
        expect(isAuthorized).toBeFalsy();
        done();
      });
    });

    test('isAnyAuthorized should return true when all permissions are authorized', done => {
      const testIds = ['123', '456'];
      const testRegion = 'GA';
      TestAuthorizations.isAnyAuthorized(testIds, testRegion).then(
        isAuthorized => {
          expect(mockPermissions.getPermissions).lastCalledWith(
            testIds,
            testRegion
          );
          expect(isAuthorized).toBeTruthy();
          done();
        }
      );
    });

    test('isAnyAuthorized should return true when some permissions are authorized', done => {
      const testIdsFalse = ['123', '456'];
      const testIdsTrue = ['789'];
      const testIdsTotal = ['123', '456', '789'];
      const testRegion = 'GA';
      mockPermissions.getPermissions.mockImplementationOnce(
        unauthorizedMockPermissions
      );
      TestAuthorizations.getPermissions(testIdsFalse, testRegion)
        .then(() => {
          expect(mockPermissions.getPermissions).lastCalledWith(
            testIdsFalse,
            testRegion
          );
          return TestAuthorizations.getPermissions(testIdsTrue, testRegion);
        })
        .then(() => {
          expect(mockPermissions.getPermissions).lastCalledWith(
            testIdsTrue,
            testRegion
          );
          return TestAuthorizations.isAnyAuthorized(testIdsTotal, testRegion);
        })
        .then(isAuthorized => {
          expect(isAuthorized).toBeTruthy();
          done();
        });
    });

    test('isAnyAuthorized should return false when none permissions are authorized', done => {
      const testIds = ['123', '456'];
      const testRegion = 'GA';
      mockPermissions.getPermissions.mockImplementationOnce(
        unauthorizedMockPermissions
      );
      return TestAuthorizations.isAnyAuthorized(testIds, testRegion).then(
        isAuthorized => {
          expect(mockPermissions.getPermissions).lastCalledWith(
            testIds,
            testRegion
          );
          expect(isAuthorized).toBeFalsy();
          done();
        }
      );
    });
  });

  test('getOrganizations should return organizations for permission', () => {
    const testId = '123';
    const testId2 = '456';
    const testRegion = 'GA';
    return TestAuthorizations.getOrganizations(testId, testRegion)
      .then(orgs => {
        expect(mockPermissions.getPermissions).lastCalledWith(
          [testId],
          testRegion
        );
        expect(orgs).toEqual(
          getMockPermissionValues([testId], true)[0].organizations
        );
        mockPermissions.getPermissions.mockImplementationOnce(
          unauthorizedMockPermissions
        );
        return TestAuthorizations.getOrganizations(testId2, testRegion);
      })
      .then(orgs => {
        expect(mockPermissions.getPermissions).lastCalledWith(
          [testId2],
          testRegion
        );
        expect(orgs).toEqual(
          getMockPermissionValues([testId], false)[0].organizations
        );
      });
  });

  test('getPayers should return payers from permission with orgId', () => {
    const testId = '123';
    const testId2 = '456';
    const orgId = 'testOrg';
    const testResource = 'testResources';
    const testRegion = 'GA';
    return TestAuthorizations.getPayers(testId, orgId, testRegion)
      .then(payers => {
        expect(mockPermissions.getPermissions).lastCalledWith(
          [testId],
          testRegion
        );
        expect(payers).toEqual(testResource);
        mockPermissions.getPermissions.mockImplementationOnce(
          unauthorizedMockPermissions
        );
        return TestAuthorizations.getPayers(testId2, orgId, testRegion);
      })
      .then(payers => {
        expect(mockPermissions.getPermissions).lastCalledWith(
          [testId2],
          testRegion
        );
        expect(payers).toEqual([]);
      });
  });
});
