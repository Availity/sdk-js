import AvAuthorizations from '@availity/authorizations-core';
import avAuthorizations from './index';

describe('AvAuthorizationsAxios', () => {
  it('is an instance of AvAuthorizations', () => {
    expect(avAuthorizations).toBeInstanceOf(AvAuthorizations);
  });

  it('has avPermissions wired to avUserPermissionsApi', () => {
    expect(avAuthorizations.avPermissions).toBeDefined();
    expect(avAuthorizations.avPermissions.getPermissions).toBeDefined();
  });

  it('has avRegions wired to avRegionsApi', () => {
    expect(avAuthorizations.avRegions).toBeDefined();
    expect(avAuthorizations.avRegions.getCurrentRegion).toBeDefined();
  });

  it('has promise set to native Promise', () => {
    expect(avAuthorizations.promise).toBe(Promise);
  });

  it('initializes authorizedMap as empty object', () => {
    expect(avAuthorizations.authorizedMap).toEqual({});
  });
});
