import Api, {
  logMessagesApi,
  navigationApi,
  notificationApi,
  organizationsApi,
  permissionsApi,
  providersApi,
  ProxyApi,
  regionsApi,
  spacesApi,
  userApi,
  userPermissionsApi,
  filesApi,
  settingsApi,
} from '../';

describe('AvAPi', () => {
  test('should be defined', () => {
    const api = new Api({});
    expect(api).toBeDefined();
    const proxy = new ProxyApi({ tenant: 'healthplan' });
    expect(proxy).toBeDefined();
  });
});

describe('API Definitions', () => {
  test('should be defined', () => {
    expect(logMessagesApi).toBeDefined();
    expect(navigationApi).toBeDefined();
    expect(notificationApi).toBeDefined();
    expect(organizationsApi).toBeDefined();
    expect(permissionsApi).toBeDefined();
    expect(providersApi).toBeDefined();
    expect(regionsApi).toBeDefined();
    expect(spacesApi).toBeDefined();
    expect(userApi).toBeDefined();
    expect(userPermissionsApi).toBeDefined();
    expect(filesApi).toBeDefined();
    expect(settingsApi).toBeDefined();
  });
});
