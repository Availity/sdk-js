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

  test('url should be correct', () => {
    expect(proxy.getUrl(proxy.config())).toBe('/api/v1/proxy/tenant');
  });
});
