import AvAuthorizations from '..';

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
      message: () =>
        `expected ids (${this.utils.printExpected(ids)}) to ${
          this.isNot ? ' not ' : ''
        } have isAuthorized in permissions (${this.utils.printReceived(
          permissions
        )})`,
    };
  },
});

function authorizedMockPermissions(permissionIds) {
  return permissionIds.map(id => ({
    id,
    organizations: [{ id: 'testOrg', resources: 'testResources' }],
  }));
}

function unauthorizedMockPermissions(permissionIds) {
  return permissionIds.map(id => ({ id }));
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
  getCurrentRegion: jest.fn(() =>
    Promise.resolve({
      data: {
        regions: [
          {
            id: mockRegion,
          },
        ],
      },
    })
  ),
};

describe('AvAuthorizations', () => {
  let testAuthorizations;

  beforeEach(() => {
    testAuthorizations = new AvAuthorizations(
      mockPermissions,
      mockRegions,
      Promise
    );
  });

  test('AvAuthorizations is defined', () => {
    expect(testAuthorizations).toBeDefined();
  });

  test('AvAuthorizations throws error when constructed without all params', () => {
    expect(() => {
      testAuthorizations = new AvAuthorizations();
    }).toThrow('A permission, region, and promise are required');
  });

  describe('Add permissions to map', () => {
    test('permission should be added to map in default region', () => {
      const testPermission = {
        id: 'testId',
      };
      testAuthorizations.addPermission(testPermission);
      expect(
        testAuthorizations.authorizedMap[testPermission.id].default.id
      ).toBe(testPermission.id);
    });

    test('permission should be given default geographies and organizations values', () => {
      const testPermission = {
        id: 'testId',
      };
      testAuthorizations.addPermission(testPermission);
      const authorizedMapVal =
        testAuthorizations.authorizedMap[testPermission.id];
      expect(authorizedMapVal.default.id).toBe(testPermission.id);
      expect(authorizedMapVal.default.geographies).toEqual([]);
      expect(authorizedMapVal.default.organizations).toEqual([]);
    });

    test('permission should not be authorized without any organization', () => {
      const testPermission = {
        id: 'testId',
      };
      testAuthorizations.addPermission(testPermission);
      const authorizedMapVal =
        testAuthorizations.authorizedMap[testPermission.id];
      expect(authorizedMapVal.default.id).toBe(testPermission.id);
      expect(authorizedMapVal.default.isAuthorized).toBeFalsy();
    });

    test('permission should be authorized when it has organizations', () => {
      const testPermission = {
        id: 'testId',
        organizations: ['someOrganization'],
      };
      testAuthorizations.addPermission(testPermission);
      const authorizedMapVal =
        testAuthorizations.authorizedMap[testPermission.id];
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
      testAuthorizations.addPermission(testPermissionFl, 'FL');
      testAuthorizations.addPermission(testPermissionGa, 'GA');
      expect(testAuthorizations.authorizedMap[testId].FL.id).toBe(testId);
      expect(testAuthorizations.authorizedMap[testId].FL.geographies).toEqual(
        testPermissionFl.geographies
      );
      expect(testAuthorizations.authorizedMap[testId].GA.id).toBe(testId);
      expect(testAuthorizations.authorizedMap[testId].GA.geographies).toEqual(
        testPermissionGa.geographies
      );
    });

    test('should do nothing when permission has no id', () => {
      testAuthorizations.addPermission({});
      expect(testAuthorizations.authorizedMap).toEqual({});
    });
  });

  test('getRegion should return given region', async () => {
    const testRegion = 'GA';
    const region = await testAuthorizations.getRegion(testRegion);
    expect(region).toBe(testRegion);
  });

  test('getRegion should use region api when no region is given', async () => {
    const region = await testAuthorizations.getRegion();
    expect(mockRegions.getCurrentRegion).toHaveBeenCalled();
    expect(region).toBe(mockRegion);
  });

  test('addPermissions adds each id to map', () => {
    const testId = 'testId';
    const ids = [testId];
    const permissions = [];
    testAuthorizations.addPermissions(ids, permissions);
    expect(testAuthorizations.authorizedMap[testId].default.id).toBe(testId);
  });

  test('addPermissions adds each id from permissions to map', () => {
    const ids = ['testId'];
    const permissions = [{ id: 'testId', testKey: 'testValue' }];
    testAuthorizations.addPermissions(ids, permissions);
    expect(testAuthorizations.authorizedMap[ids[0]].default).toEqual(
      permissions[0]
    );
  });

  test('getMissingIds should return ids of permissions not in map', () => {
    const allIds = ['123', '456', '789'];
    const addedIds = ['789'];
    const testIds = ['123', '456'];
    testAuthorizations.addPermissions(addedIds, []);
    expect(testAuthorizations.getMissingIds(allIds)).toEqual(testIds);
  });

  test('getMissingIds should return ids of permissions not in map accounting for region', () => {
    const allIds = ['123', '456', '789'];
    const addedIds = ['789'];
    const testIds = ['123', '456'];
    const region1 = 'FL';
    const region2 = 'GA';
    testAuthorizations.addPermissions(allIds, [], region1);
    testAuthorizations.addPermissions(addedIds, [], region2);
    expect(testAuthorizations.getMissingIds(allIds, region2)).toEqual(testIds);
  });

  test('getFromMap should return permissions with ids in map', () => {
    const allIds = ['123', '456', '789'];
    const addedIds = ['789'];
    testAuthorizations.addPermissions(addedIds, []);
    expect(testAuthorizations.getFromMap(allIds)).toEqual(
      getMockPermissionValues(addedIds, false)
    );
  });

  test('getFromMap should return permissions with ids in map based on region', () => {
    const allIds = ['123', '456', '789'];
    const addedIds = ['789'];
    const region1 = 'FL';
    const region2 = 'GA';
    testAuthorizations.addPermissions(allIds, [], region1);
    testAuthorizations.addPermissions(addedIds, [], region2);
    expect(testAuthorizations.getFromMap(allIds, region2)).toEqual(
      getMockPermissionValues(addedIds, false)
    );
  });

  describe('Get Permissions', () => {
    test('Get permissions should call permission api', async () => {
      const testIds = ['123', '456'];
      await testAuthorizations.getPermissions(testIds);
      expect(mockPermissions.getPermissions).toHaveBeenCalled();
    });

    test('should return requested permissions with isAuthorized flag set', async () => {
      const testIds = ['123', '456'];
      const permissions = await testAuthorizations.getPermissions(testIds);
      expect(permissions).toBeAuthorized(testIds);
      expect(permissions).toEqual(getMockPermissionValues(testIds, true));
    });

    test('should reject when a non-array is passed in', async () => {
      const testIds = '123';
      try {
        await testAuthorizations.getPermissions(testIds);
      } catch (error) {
        expect(error).toBe('permissionIds must be an array of strings');
      }
    });

    test('should reject when passed in array is not all strings', async () => {
      const testIds = ['123', 456];
      try {
        await testAuthorizations.getPermissions(testIds);
      } catch (error) {
        expect(error).toBe('permissionIds must be an array of strings');
      }
    });
  });

  test('getPermission should return single requested permission', async () => {
    const testId = '123';
    const testRegion = 'GA';
    const permission = await testAuthorizations.getPermission(
      testId,
      testRegion
    );
    expect(mockPermissions.getPermissions).toHaveBeenLastCalledWith(
      [testId],
      testRegion
    );
    expect(permission).toEqual(getMockPermissionValues([testId], true)[0]);
  });

  test('getPermission should reject when a non-string is passed in', () => {
    const testId = 123;
    return testAuthorizations.getPermission(testId).catch(error => {
      expect(error).toBe('permissionId must be a string');
    });
  });

  describe('Authorized', () => {
    test('should return true for authorized permission', async () => {
      const testId = '123';
      const testRegion = 'GA';
      const isAuthorized = await testAuthorizations.isAuthorized(
        testId,
        testRegion
      );
      expect(mockPermissions.getPermissions).toHaveBeenLastCalledWith(
        [testId],
        testRegion
      );
      expect(isAuthorized).toBeTruthy();
    });

    test('should return false for unauthorized permission', async () => {
      const testId = '123';
      const testRegion = 'GA';
      mockPermissions.getPermissions.mockImplementationOnce(
        unauthorizedMockPermissions
      );
      const isAuthorized = await testAuthorizations.isAuthorized(
        testId,
        testRegion
      );

      expect(mockPermissions.getPermissions).toHaveBeenLastCalledWith(
        [testId],
        testRegion
      );
      expect(isAuthorized).toBeFalsy();
    });

    test('isAnyAuthorized should return true when all permissions are authorized', async () => {
      const testIds = ['123', '456'];
      const testRegion = 'GA';
      const isAuthorized = await testAuthorizations.isAnyAuthorized(
        testIds,
        testRegion
      );

      expect(mockPermissions.getPermissions).toHaveBeenLastCalledWith(
        testIds,
        testRegion
      );
      expect(isAuthorized).toBeTruthy();
    });

    test('isAnyAuthorized should return true when some permissions are authorized', async () => {
      const testIdsFalse = ['123', '456'];
      const testIdsTrue = ['789'];
      const testIdsTotal = ['123', '456', '789'];
      const testRegion = 'GA';
      mockPermissions.getPermissions.mockImplementationOnce(
        unauthorizedMockPermissions
      );
      await testAuthorizations.getPermissions(testIdsFalse, testRegion);
      expect(mockPermissions.getPermissions).toHaveBeenLastCalledWith(
        testIdsFalse,
        testRegion
      );

      await testAuthorizations.getPermissions(testIdsTrue, testRegion);
      expect(mockPermissions.getPermissions).toHaveBeenLastCalledWith(
        testIdsTrue,
        testRegion
      );

      const isAuthorized = await testAuthorizations.isAnyAuthorized(
        testIdsTotal,
        testRegion
      );
      expect(isAuthorized).toBeTruthy();
    });

    test('isAnyAuthorized should return false when none permissions are authorized', async () => {
      const testIds = ['123', '456'];
      const testRegion = 'GA';
      mockPermissions.getPermissions.mockImplementationOnce(
        unauthorizedMockPermissions
      );
      const isAuthorized = await testAuthorizations.isAnyAuthorized(
        testIds,
        testRegion
      );
      expect(mockPermissions.getPermissions).toHaveBeenLastCalledWith(
        testIds,
        testRegion
      );
      expect(isAuthorized).toBeFalsy();
    });
  });

  test('getOrganizations should return organizations for permission', async () => {
    const testId = '123';
    const testId2 = '456';
    const testRegion = 'GA';
    let orgs = await testAuthorizations.getOrganizations(testId, testRegion);
    expect(mockPermissions.getPermissions).toHaveBeenLastCalledWith(
      [testId],
      testRegion
    );
    expect(orgs).toEqual(
      getMockPermissionValues([testId], true)[0].organizations
    );
    mockPermissions.getPermissions.mockImplementationOnce(
      unauthorizedMockPermissions
    );
    orgs = await testAuthorizations.getOrganizations(testId2, testRegion);
    expect(mockPermissions.getPermissions).toHaveBeenLastCalledWith(
      [testId2],
      testRegion
    );
    expect(orgs).toEqual(
      getMockPermissionValues([testId], false)[0].organizations
    );
  });

  test('getPayers should return payers from permission with orgId', async () => {
    const testId = '123';
    const testId2 = '456';
    const orgId = 'testOrg';
    const testResource = 'testResources';
    const testRegion = 'GA';
    let payers = await testAuthorizations.getPayers(testId, orgId, testRegion);
    expect(mockPermissions.getPermissions).toHaveBeenLastCalledWith(
      [testId],
      testRegion
    );
    expect(payers).toEqual(testResource);
    mockPermissions.getPermissions.mockImplementationOnce(
      unauthorizedMockPermissions
    );

    payers = await testAuthorizations.getPayers(testId2, orgId, testRegion);
    expect(mockPermissions.getPermissions).toHaveBeenLastCalledWith(
      [testId2],
      testRegion
    );
    expect(payers).toEqual([]);
  });
});
