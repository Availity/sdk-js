import AvApi, {
  avCodesApi,
  avDisclaimersApi,
  avFilesApi,
  avFilesDeliveryApi,
  avLogMessagesApi,
  avLogMessagesApiV2,
  avNavigationApi,
  avNotificationsApi,
  avOrganizationsApi,
  avPdfApi,
  avPermissionsApi,
  avProvidersApi,
  avRegionsApi,
  avSettingsApi,
  avSlotMachineApi,
  avSpacesApi,
  avUserApi,
  avUserPermissionsApi,
  avWebQLApi,
} from '..';
import API_OPTIONS from '../options';

describe('AvAPi', () => {
  test('should be defined', () => {
    const api = new AvApi({});
    expect(api).toBeDefined();
  });

  test('should throw if no config', () => {
    expect(() => new AvApi()).toThrow('[config] must be defined');
  });

  test('get default config', () => {
    const api = new AvApi({});
    expect(api.config()).toEqual(API_OPTIONS.API);
  });

  test('get merged config', () => {
    const api = new AvApi({ name: 'test' });
    expect(api.config()).toEqual({ ...API_OPTIONS.API, name: 'test' });
  });

  test('addParams to config', () => {
    const api = new AvApi({ name: 'test' });
    const config = api.addParams({ foo: 'bar' });
    expect(config.params.foo).toEqual('bar');
  });

  test('cacheParams adds params to config', () => {
    const api = new AvApi({ name: 'test' });
    const config = { cacheBust: '1', pageBust: '2', sessionBust: '3' };
    api.cacheParams(config);

    expect(config.params.cacheBust).toEqual('1');
    expect(config.params.pageBust).toEqual('2');
    expect(config.params.sessionBust).toEqual('3');
  });

  test('getCacheBustValue', () => {
    const api = new AvApi({});

    expect(api.getCacheBustVal()).toBeUndefined();
    expect(api.getCacheBustVal(true, () => '1')).toEqual('1');
    expect(api.getCacheBustVal(() => '1')).toEqual('1');
    expect(api.getCacheBustVal('1')).toEqual('1');
  });

  test('getPageBust', () => {
    const api = new AvApi({});
    api.setPageBust('1');
    expect(api.getPageBust()).toEqual('1');
  });

  test('getUrl from config', () => {
    const api = new AvApi({});

    expect(api.getUrl({ url: '/test' })).toEqual('/test');
    expect(api.getUrl({ api: true, url: '/test' }, '123')).toEqual('/test/123');
    expect(api.getUrl({ api: true, path: '/path', version: '/v1', name: '/name' }, '123')).toEqual('/path/v1/name/123');
  });

  test('getRequestUrl from config', () => {
    let api = new AvApi({ url: '/test' });
    expect(api.getRequestUrl()).toEqual('/test');

    api = new AvApi({ name: 'test' });
    expect(api.getRequestUrl()).toEqual('/api/v1/test');
  });

  test('getLocation from response', () => {
    const api = new AvApi({});
    expect(api.getLocation({ config: {}, headers: { location: 'location' } })).toEqual(
      'http://localhost:8080/location'
    );
  });

  test('shouldPoll on response', () => {
    const api = new AvApi({});

    expect(api.shouldPoll()).toBeFalsy();
    expect(api.shouldPoll({ config: { polling: false } })).toBeFalsy();
    expect(api.shouldPoll({ config: { polling: true }, status: 200 })).toBeFalsy();
    expect(api.shouldPoll({ config: { polling: true, pollingIntervals: [] }, status: 202 })).toBeFalsy();
    expect(api.shouldPoll({ config: { polling: true, pollingIntervals: [1] }, status: 202 })).toBeTruthy();
  });

  test('getQueryResultKey from data', () => {
    const api = new AvApi({});
    expect(api.getQueryResultKey({ data: [], test: 1, example: '1', foo: false })).toEqual('data');
  });

  test('getResult from data', () => {
    const api = new AvApi({});
    expect(api.getResult({ data: ['1', '2', '3'] })).toEqual(['1', '2', '3']);
  });

  test('should use allResultKey if defined', async () => {
    const query = jest.fn(() =>
      Promise.resolve({
        status: 200,
        data: {
          array1: ['1', '2'],
          array2: ['3', '4'],
        },
      })
    );

    const api = new AvApi({ name: 'test', allResultKey: 'array2' });
    api.query = query;

    const result = await api.all({});
    expect(result).toEqual(['3', '4']);
  });
});

describe('API Definitions', () => {
  test('should be defined', () => {
    expect(avCodesApi).toBeDefined();
    expect(avDisclaimersApi).toBeDefined();
    expect(avFilesApi).toBeDefined();
    expect(avFilesDeliveryApi).toBeDefined();
    expect(avLogMessagesApi).toBeDefined();
    expect(avLogMessagesApiV2).toBeDefined();
    expect(avNavigationApi).toBeDefined();
    expect(avNotificationsApi).toBeDefined();
    expect(avOrganizationsApi).toBeDefined();
    expect(avPdfApi).toBeDefined();
    expect(avPermissionsApi).toBeDefined();
    expect(avProvidersApi).toBeDefined();
    expect(avRegionsApi).toBeDefined();
    expect(avSettingsApi).toBeDefined();
    expect(avSlotMachineApi).toBeDefined();
    expect(avSpacesApi).toBeDefined();
    expect(avUserApi).toBeDefined();
    expect(avUserPermissionsApi).toBeDefined();
    expect(avWebQLApi).toBeDefined();
  });
});
