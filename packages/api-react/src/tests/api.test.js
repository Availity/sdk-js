import {
  AvApiResource,
  AvLogMessagesResource,
  AvNavigationResource,
  AvOrganizationsResource,
  AvPermissionsResource,
  AvProvidersResource,
  AvProxyResource,
  AvRegionsResource,
  AvSpacesResource,
  AvUsersResource,
  AvUserPermissionsResource,
} from '../';

describe('AvApiResource', () => {
  test('AvApiResource should be defined', () => {
    const TestAvApi = new AvApiResource({});
    expect(TestAvApi).toBeDefined();
  });
});

describe('AvLogMessagesResource', () => {
  test('AvLogMessagesResource should be defined', () => {
    const TestAvApi = new AvLogMessagesResource({});
    expect(TestAvApi).toBeDefined();
  });
});

describe('AvNavigationResource', () => {
  test('AvNavigationResource should be defined', () => {
    const TestAvApi = new AvNavigationResource({});
    expect(TestAvApi).toBeDefined();
  });
});

describe('AvOrganizationsResource', () => {
  test('AvOrganizationsResource should be defined', () => {
    const TestAvApi = new AvOrganizationsResource({});
    expect(TestAvApi).toBeDefined();
  });
});

describe('AvPermissionsResource', () => {
  test('AvPermissionsResource should be defined', () => {
    const TestAvApi = new AvPermissionsResource({});
    expect(TestAvApi).toBeDefined();
  });
});

describe('AvProvidersResource', () => {
  test('AvProvidersResource should be defined', () => {
    const TestAvApi = new AvProvidersResource({});
    expect(TestAvApi).toBeDefined();
  });
});

describe('AvProxyResource', () => {
  test('AvProxyResource should be defined', () => {
    const TestAvApi = new AvProxyResource({
      tenant: 'testTennant',
      name: 'testName',
    });
    expect(TestAvApi).toBeDefined();
  });

  test('AvProxyResource should throw error without tenant', () => {
    expect(() => {
      const testProxy = new AvProxyResource();
      expect(testProxy).not.toBeDefined();
    }).toThrow('Must specify tenant name for Proxy');
  });
});

describe('AvRegionsResource', () => {
  test('AvRegionsResource should be defined', () => {
    const TestAvApi = new AvRegionsResource({});
    expect(TestAvApi).toBeDefined();
  });
});

describe('AvSpacesResource', () => {
  test('AvSpacesResource should be defined', () => {
    const TestAvApi = new AvSpacesResource({});
    expect(TestAvApi).toBeDefined();
  });
});

describe('AvUsersResource', () => {
  test('AvUsersResource should be defined', () => {
    const TestAvApi = new AvUsersResource({});
    expect(TestAvApi).toBeDefined();
  });
});

describe('AvUserPermissionsResource', () => {
  test('AvUserPermissionsResource should be defined', () => {
    const TestAvApi = new AvUserPermissionsResource({});
    expect(TestAvApi).toBeDefined();
  });
});
