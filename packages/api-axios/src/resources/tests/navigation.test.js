import AvNavigationApi from '../navigation';

describe('AvNavigationApi', () => {
  let api;
  beforeEach(() => {
    api = new AvNavigationApi();
  });
  test('should be defined', () => {
    expect(api).toBeDefined();
  });

  test('url should be correct', () => {
    expect(api.getUrl(api.config())).toBe('/api/sdk/platform/v1/navigation/spaces');
  });
});
