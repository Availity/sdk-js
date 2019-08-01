import Api, {
  AvMicroserviceApi,
  AvProxyApi,
  avWebQLApi,
  avLogMessagesApi,
  avLogMessagesApiV2,
  avNavigationApi,
  avNotificationApi,
  avOrganizationsApi,
  avPermissionsApi,
  avProvidersApi,
  avRegionsApi,
  avSpacesApi,
  avUserApi,
  avUserPermissionsApi,
  avFilesApi,
  avFilesDeliveryApi,
  avSettingsApi,
  avSlotMachineApi,
  avDisclaimersApi,
  avCodesApi,
} from '..';

describe('AvAPi', () => {
  test('should be defined', () => {
    const api = new Api({});
    expect(api).toBeDefined();
    const proxy = new AvProxyApi({ tenant: 'healthplan' });
    expect(proxy).toBeDefined();
    const ms = new AvMicroserviceApi({ path: 'urlPath' });
    expect(ms).toBeDefined();
  });
});

describe('API Definitions', () => {
  test('should be defined', () => {
    expect(avWebQLApi).toBeDefined();
    expect(avLogMessagesApi).toBeDefined();
    expect(avLogMessagesApiV2).toBeDefined();
    expect(avNavigationApi).toBeDefined();
    expect(avNotificationApi).toBeDefined();
    expect(avOrganizationsApi).toBeDefined();
    expect(avPermissionsApi).toBeDefined();
    expect(avProvidersApi).toBeDefined();
    expect(avRegionsApi).toBeDefined();
    expect(avSpacesApi).toBeDefined();
    expect(avUserApi).toBeDefined();
    expect(avUserPermissionsApi).toBeDefined();
    expect(avFilesApi).toBeDefined();
    expect(avFilesDeliveryApi).toBeDefined();
    expect(avSettingsApi).toBeDefined();
    expect(avSlotMachineApi).toBeDefined();
    expect(avDisclaimersApi).toBeDefined();
    expect(avCodesApi).toBeDefined();
  });
});
