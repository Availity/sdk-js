/* global angular, inject, describe, beforeEach, test, expect */

import 'angular';
import 'angular-mocks';
import AvApiModule from '../';

describe('prebuilt resources', () => {
  beforeEach(() => {
    angular.mock.module(AvApiModule);
  });

  test('AvLogMessagesResource should be defined', () => {
    let AvLogMessagesResource;
    inject(_AvLogMessagesResource_ => {
      AvLogMessagesResource = _AvLogMessagesResource_;
    });
    expect(AvLogMessagesResource).toBeDefined();
  });

  test('AvNavigationResource should be defined', () => {
    let AvNavigationResource;
    inject(_AvNavigationResource_ => {
      AvNavigationResource = _AvNavigationResource_;
    });
    expect(AvNavigationResource).toBeDefined();
  });

  test('AvOrganizationsResource should be defined', () => {
    let AvOrganizationsResource;
    inject(_AvOrganizationsResource_ => {
      AvOrganizationsResource = _AvOrganizationsResource_;
    });
    expect(AvOrganizationsResource).toBeDefined();
  });

  test('AvPermissionsResource should be defined', () => {
    let AvPermissionsResource;
    inject(_AvPermissionsResource_ => {
      AvPermissionsResource = _AvPermissionsResource_;
    });
    expect(AvPermissionsResource).toBeDefined();
  });

  test('AvProvidersResource should be defined', () => {
    let AvProvidersResource;
    inject(_AvProvidersResource_ => {
      AvProvidersResource = _AvProvidersResource_;
    });
    expect(AvProvidersResource).toBeDefined();
  });

  test('AvProxyResource should be defined', () => {
    let AvProxyResource;
    inject(_AvProxyResource_ => {
      AvProxyResource = _AvProxyResource_;
    });
    expect(AvProxyResource).toBeDefined();
    const testProxy = new AvProxyResource({
      tenant: 'testTennant',
      name: 'testName',
    });
    expect(testProxy).toBeDefined();
  });

  test('AvProxyResource should throw error without tenant', () => {
    let AvProxyResource;
    inject(_AvProxyResource_ => {
      AvProxyResource = _AvProxyResource_;
    });
    expect(AvProxyResource).toBeDefined();
    expect(() => {
      const testProxy = new AvProxyResource();
      expect(testProxy).not.toBeDefined();
    }).toThrow('Must specify tenant name for Proxy');
  });

  test('AvRegionsResource should be defined', () => {
    let AvRegionsResource;
    inject(_AvRegionsResource_ => {
      AvRegionsResource = _AvRegionsResource_;
    });
    expect(AvRegionsResource).toBeDefined();
  });

  test('AvSpacesResource should be defined', () => {
    let AvSpacesResource;
    inject(_AvSpacesResource_ => {
      AvSpacesResource = _AvSpacesResource_;
    });
    expect(AvSpacesResource).toBeDefined();
  });

  test('AvUsersResource should be defined', () => {
    let AvUsersResource;
    inject(_AvUsersResource_ => {
      AvUsersResource = _AvUsersResource_;
    });
    expect(AvUsersResource).toBeDefined();
  });

  test('AvUserPermissionsResource should be defined', () => {
    let AvUserPermissionsResource;
    inject(_AvUserPermissionsResource_ => {
      AvUserPermissionsResource = _AvUserPermissionsResource_;
    });
    expect(AvUserPermissionsResource).toBeDefined();
  });
});
