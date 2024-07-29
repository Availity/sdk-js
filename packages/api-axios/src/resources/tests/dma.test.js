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

  test('send should generate fields correctly', () => {
    const fields = api.send('info', { testField1: 'test1', testField2: 'test2'});
    expect(fields).toContain('level=info&entries.testField1=test1&entries.testField2=test2');
  });
});
