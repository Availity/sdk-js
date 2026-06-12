import AvMicroserviceApi from '../ms';

describe('AvMicroserviceAPi', () => {
  let ms;
  beforeEach(() => {
    ms = new AvMicroserviceApi({ name: 'urlPath' });
  });

  test('should be defined', () => {
    expect(ms).toBeDefined();
  });

  test('url should be correct', () => {
    expect(ms.getRequestUrl()).toBe('/ms/api/availity/internal/urlPath');
  });

  test('should use an absolute url', () => {
    const api = new AvMicroserviceApi({ url: 'https://test-apps.com' });

    expect(api.getRequestUrl()).toBe('https://test-apps.com/ms/api/availity/internal/');
    expect(api.getUrl({ id: 'serviceName' })).toBe('https://test-apps.com/ms/api/availity/internal/serviceName');
  });
});
