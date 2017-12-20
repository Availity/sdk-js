import angular from 'angular';
import 'angular-mocks';
import avModule from '../';

describe('Api Definitions Angular', () => {
  beforeEach(() => {
    angular.mock.module(avModule);
  });

  test('avLogMessagesApi should be defined', () => {
    let avLogMessagesApi;
    angular.mock.inject(_avLogMessagesApi_ => {
      avLogMessagesApi = _avLogMessagesApi_;
    });
    expect(avLogMessagesApi).toBeDefined();
  });

  test('avNavigationApi should be defined', () => {
    let avNavigationApi;
    angular.mock.inject(_avNavigationApi_ => {
      avNavigationApi = _avNavigationApi_;
    });
    expect(avNavigationApi).toBeDefined();
  });

  test('avNotificationsApi should be defined', () => {
    let avNotificationsApi;
    angular.mock.inject(_avNotificationsApi_ => {
      avNotificationsApi = _avNotificationsApi_;
    });
    expect(avNotificationsApi).toBeDefined();
  });

  test('avOrganizationsApi should be defined', () => {
    let avOrganizationsApi;
    angular.mock.inject(_avOrganizationsApi_ => {
      avOrganizationsApi = _avOrganizationsApi_;
    });
    expect(avOrganizationsApi).toBeDefined();
  });

  test('avPermissionsApi should be defined', () => {
    let avPermissionsApi;
    angular.mock.inject(_avPermissionsApi_ => {
      avPermissionsApi = _avPermissionsApi_;
    });
    expect(avPermissionsApi).toBeDefined();
  });

  test('avProvidersApi should be defined', () => {
    let avProvidersApi;
    angular.mock.inject(_avProvidersApi_ => {
      avProvidersApi = _avProvidersApi_;
    });
    expect(avProvidersApi).toBeDefined();
  });

  test('AvProxyApi should be defined', () => {
    let AvProxyApi;
    angular.mock.inject(_AvProxyApi_ => {
      AvProxyApi = _AvProxyApi_;
    });
    expect(AvProxyApi).toBeDefined();
    const testProxy = new AvProxyApi({
      tenant: 'testTennant',
      name: 'testName',
    });
    expect(testProxy).toBeDefined();
  });

  test('AvProxyApi should throw error without tenant', () => {
    let AvProxyApi;
    angular.mock.inject(_AvProxyApi_ => {
      AvProxyApi = _AvProxyApi_;
    });
    expect(AvProxyApi).toBeDefined();
    expect(() => {
      const testProxy = new AvProxyApi();
      expect(testProxy).not.toBeDefined();
    }).toThrow('Must specify tenant name for Proxy');
  });

  test('avRegionsApi should be defined', () => {
    let avRegionsApi;
    angular.mock.inject(_avRegionsApi_ => {
      avRegionsApi = _avRegionsApi_;
    });
    expect(avRegionsApi).toBeDefined();
  });

  test('avSpacesApi should be defined', () => {
    let avSpacesApi;
    angular.mock.inject(_avSpacesApi_ => {
      avSpacesApi = _avSpacesApi_;
    });
    expect(avSpacesApi).toBeDefined();
  });

  test('avUsersApi should be defined', () => {
    let avUsersApi;
    angular.mock.inject(_avUsersApi_ => {
      avUsersApi = _avUsersApi_;
    });
    expect(avUsersApi).toBeDefined();
  });

  test('avUserPermissionsApi should be defined', () => {
    let avUserPermissionsApi;
    angular.mock.inject(_avUserPermissionsApi_ => {
      avUserPermissionsApi = _avUserPermissionsApi_;
    });
    expect(avUserPermissionsApi).toBeDefined();
  });

  test('avPdfApi should be defined', () => {
    let avPdfApi;
    angular.mock.inject(_avPdfApi_ => {
      avPdfApi = _avPdfApi_;
    });
    expect(avPdfApi).toBeDefined();
  });
});
