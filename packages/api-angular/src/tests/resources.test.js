import angular from 'angular';
import 'angular-mocks';
import AvApiModule from '../';

describe('prebuilt resources', () => {
  beforeEach(() => {
    angular.mock.module(AvApiModule);
  });

  test('AvLogMessagesResource should be defined', () => {
    let AvLogMessagesResource;
    angular.mock.inject(_AvLogMessagesResource_ => {
      AvLogMessagesResource = _AvLogMessagesResource_;
    });
    expect(AvLogMessagesResource).toBeDefined();
  });

  test('AvNavigationResource should be defined', () => {
    let AvNavigationResource;
    angular.mock.inject(_AvNavigationResource_ => {
      AvNavigationResource = _AvNavigationResource_;
    });
    expect(AvNavigationResource).toBeDefined();
  });

  test('AvOrganizationsResource should be defined', () => {
    let AvOrganizationsResource;
    angular.mock.inject(_AvOrganizationsResource_ => {
      AvOrganizationsResource = _AvOrganizationsResource_;
    });
    expect(AvOrganizationsResource).toBeDefined();
  });

  test('AvPermissionsResource should be defined', () => {
    let AvPermissionsResource;
    angular.mock.inject(_AvPermissionsResource_ => {
      AvPermissionsResource = _AvPermissionsResource_;
    });
    expect(AvPermissionsResource).toBeDefined();
  });

  test('AvProvidersResource should be defined', () => {
    let AvProvidersResource;
    angular.mock.inject(_AvProvidersResource_ => {
      AvProvidersResource = _AvProvidersResource_;
    });
    expect(AvProvidersResource).toBeDefined();
  });

  test('AvProxyResource should be defined', () => {
    let AvProxyResource;
    angular.mock.inject(_AvProxyResource_ => {
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
    angular.mock.inject(_AvProxyResource_ => {
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
    angular.mock.inject(_AvRegionsResource_ => {
      AvRegionsResource = _AvRegionsResource_;
    });
    expect(AvRegionsResource).toBeDefined();
  });

  test('AvSpacesResource should be defined', () => {
    let AvSpacesResource;
    angular.mock.inject(_AvSpacesResource_ => {
      AvSpacesResource = _AvSpacesResource_;
    });
    expect(AvSpacesResource).toBeDefined();
  });

  test('AvUsersResource should be defined', () => {
    let AvUsersResource;
    angular.mock.inject(_AvUsersResource_ => {
      AvUsersResource = _AvUsersResource_;
    });
    expect(AvUsersResource).toBeDefined();
  });

  test('AvUserPermissionsResource should be defined', () => {
    let AvUserPermissionsResource;
    angular.mock.inject(_AvUserPermissionsResource_ => {
      AvUserPermissionsResource = _AvUserPermissionsResource_;
    });
    expect(AvUserPermissionsResource).toBeDefined();
  });
});
