import AvLogMessagesApiV3 from '../dma-cloud';

describe('AvLogMessagesApiV3', () => {
  let api;
  beforeEach(() => {
    api = new AvLogMessagesApiV3();
  });
  test('should be defined', () => {
    expect(api).toBeDefined();
  });

  test('url should be correct', () => {
    expect(api.getUrl(api.config())).toBe('/cloud/web/appl/analytics/log');
  });

  test('send should generate fields correctly', () => {
    const fields = api.send('info', { testField1: 'test1', testField2: 'test2'});
    expect(fields).toContain('level=info&entries.testField1=test1&entries.testField2=test2');
  });
});
