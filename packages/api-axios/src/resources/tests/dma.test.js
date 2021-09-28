import AvLogMessagesApiV2 from '../dma';

describe('AvLogMessagesApiV2', () => {
  let api;
  beforeEach(() => {
    api = new AvLogMessagesApiV2();
  });
  test('should be defined', () => {
    expect(api).toBeDefined();
  });

  test('url should be correct', () => {
    expect(api.getUrl(api.config())).toBe('/ms/api/availity/internal/spc/analytics/log');
  });
});
