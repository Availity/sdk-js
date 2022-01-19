import AvProxyApi from '../proxy';

describe('AvProxyApi', () => {
  let proxy;
  beforeEach(() => {
    proxy = new AvProxyApi({ tenant: 'tenant' });
  });

  test('should be defined', () => {
    expect(proxy).toBeDefined();
  });

  test('should reject if tenant not provided', () => {
    expect(() => new AvProxyApi()).toThrow('[config.tenant] must be defined');
  });

  test('path is generated in constructor', () => {
    expect(proxy.config().path).toBe('api/v1/proxy/tenant');
  });

  test('url is created properly', () => {
    const api = new AvProxyApi({ tenant: 'foo', name: 'v1/test/bar/baz' });

    expect(api.getRequestUrl()).toBe('/api/v1/proxy/foo/v1/test/bar/baz');
  });
});
