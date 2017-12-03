import angular from 'angular';
import 'angular-mocks';
import avModule from '../';

describe('prebuilt resources', () => {
  beforeEach(() => {
    angular.mock.module(avModule);
  });

  test('avLogMessagesResource should be defined', () => {
    let avLogMessagesResource;
    angular.mock.inject(_avLogMessagesResource_ => {
      avLogMessagesResource = _avLogMessagesResource_;
    });
    expect(avLogMessagesResource).toBeDefined();
  });

  test('avNavigationResource should be defined', () => {
    let avNavigationResource;
    angular.mock.inject(_avNavigationResource_ => {
      avNavigationResource = _avNavigationResource_;
    });
    expect(avNavigationResource).toBeDefined();
  });

  test('avOrganizationsResource should be defined', () => {
    let avOrganizationsResource;
    angular.mock.inject(_avOrganizationsResource_ => {
      avOrganizationsResource = _avOrganizationsResource_;
    });
    expect(avOrganizationsResource).toBeDefined();
  });

  test('avPermissionsResource should be defined', () => {
    let avPermissionsResource;
    angular.mock.inject(_avPermissionsResource_ => {
      avPermissionsResource = _avPermissionsResource_;
    });
    expect(avPermissionsResource).toBeDefined();
  });

  test('avProvidersResource should be defined', () => {
    let avProvidersResource;
    angular.mock.inject(_avProvidersResource_ => {
      avProvidersResource = _avProvidersResource_;
    });
    expect(avProvidersResource).toBeDefined();
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

  test('avRegionsResource should be defined', () => {
    let avRegionsResource;
    angular.mock.inject(_avRegionsResource_ => {
      avRegionsResource = _avRegionsResource_;
    });
    expect(avRegionsResource).toBeDefined();
  });

  test('avSpacesResource should be defined', () => {
    let avSpacesResource;
    angular.mock.inject(_avSpacesResource_ => {
      avSpacesResource = _avSpacesResource_;
    });
    expect(avSpacesResource).toBeDefined();
  });

  test('avUsersResource should be defined', () => {
    let avUsersResource;
    angular.mock.inject(_avUsersResource_ => {
      avUsersResource = _avUsersResource_;
    });
    expect(avUsersResource).toBeDefined();
  });

  test('avUserPermissionsResource should be defined', () => {
    let avUserPermissionsResource;
    angular.mock.inject(_avUserPermissionsResource_ => {
      avUserPermissionsResource = _avUserPermissionsResource_;
    });
    expect(avUserPermissionsResource).toBeDefined();
  });
});
