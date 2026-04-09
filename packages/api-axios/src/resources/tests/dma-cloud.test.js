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
    expect(fields).toStrictEqual('level=info&entries.testField1=test1&entries.testField2=test2&X_XSRF_TOKEN=');
  });

  test('send should generate optional overrides fields correctly', () => {
    const fields = api.send('info', { testField1: 'test1', testField2: 'test2', overrides: { akaName: 'override1', transactionId: 'override2' } });
    expect(fields).toStrictEqual('level=info&entries.testField1=test1&entries.testField2=test2&overrides.akaName=override1&overrides.transactionId=override2&X_XSRF_TOKEN=');
  });

  test('send should not include undefined values in fields', () => {
    const fields = api.send('info', { testField1: 'test1', testField2: undefined });
    expect(fields).toStrictEqual('level=info&entries.testField1=test1&X_XSRF_TOKEN=');
    expect(fields).not.toContain('testField2');
  });

  test('send should not include null values in fields', () => {
    const fields = api.send('info', { testField1: 'test1', testField2: null });
    expect(fields).toStrictEqual('level=info&entries.testField1=test1&X_XSRF_TOKEN=');
    expect(fields).not.toContain('testField2');
  });

  test('send should not include overrides=undefined when overrides is not provided', () => {
    const fields = api.send('info', { testField1: 'test1' });
    expect(fields).not.toContain('overrides');
  });
});
