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
    expect(ms.getUrl(ms.config())).toBe('/ms/api/availity/internal/urlPath');
  });
});
