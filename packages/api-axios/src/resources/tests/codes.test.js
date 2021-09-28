import AvCodesApi from '../codes';

describe('AvCodesApi', () => {
  let api = new AvCodesApi();
  beforeEach(() => {
    api = new AvCodesApi();
  });

  test('should be defined', () => {
    expect(api).toBeDefined();
  });

  test('url should be correct', () => {
    expect(api.getUrl(api.config())).toBe('/api/v1/codes');
  });
});
