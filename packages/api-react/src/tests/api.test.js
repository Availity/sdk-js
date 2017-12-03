import AvApiResource, {
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
    const api = new AvApiResource({});
    expect(api).toBeDefined();
  });
});

describe('AvLogMessagesResource', () => {
  test('AvLogMessagesResource should be defined', () => {
    const api = new AvLogMessagesResource({});
    expect(api).toBeDefined();
  });
});

describe('AvNavigationResource', () => {
  test('AvNavigationResource should be defined', () => {
    const api = new AvNavigationResource({});
    expect(api).toBeDefined();
  });
});

describe('AvOrganizationsResource', () => {
  test('AvOrganizationsResource should be defined', () => {
    const api = new AvOrganizationsResource({});
    expect(api).toBeDefined();
  });
});

describe('AvPermissionsResource', () => {
  test('AvPermissionsResource should be defined', () => {
    const api = new AvPermissionsResource({});
    expect(api).toBeDefined();
  });
});

describe('AvProvidersResource', () => {
  test('AvProvidersResource should be defined', () => {
    const api = new AvProvidersResource({});
    expect(api).toBeDefined();
  });
});

describe('AvProxyResource', () => {
  test('AvProxyResource should be defined', () => {
    const api = new AvProxyResource({
      tenant: 'testTennant',
      name: 'testName',
    });
    expect(api).toBeDefined();
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
    const api = new AvRegionsResource({});
    expect(api).toBeDefined();
  });
});

describe('AvSpacesResource', () => {
  test('AvSpacesResource should be defined', () => {
    const api = new AvSpacesResource({});
    expect(api).toBeDefined();
  });
});

describe('AvUsersResource', () => {
  test('AvUsersResource should be defined', () => {
    const api = new AvUsersResource({});
    expect(api).toBeDefined();
  });
});

describe('AvUserPermissionsResource', () => {
  test('AvUserPermissionsResource should be defined', () => {
    const api = new AvUserPermissionsResource({});
    expect(api).toBeDefined();
  });
});
