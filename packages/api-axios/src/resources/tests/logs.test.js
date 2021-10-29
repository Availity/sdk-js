import AvLogMessagesApi from '../logs';

describe('AvLogMessagesApi', () => {
  let api;
  beforeEach(() => {
    api = new AvLogMessagesApi();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should be defined', () => {
    expect(api).toBeDefined();
  });

  test('url should be correct', () => {
    expect(api.getUrl(api.config())).toBe('/api/v1/log-messages');
  });

  test('send() should return {level, entries}', () => {
    api = new AvLogMessagesApi();
    const level = 'testLevel';
    const entries = { foo: 'bar', deeply: { nested: 'value' } };
    const sent = api.send(level, entries);

    const params = new URLSearchParams(sent);

    expect(params.get('level')).toBe('testLevel');
    expect(params.get('entries.foo')).toBe('bar');
    expect(params.get('entries.deeply.nested')).toBe('value');
  });

  describe('log levels', () => {
    const testEntries = { a: '1', b: '2' };

    beforeEach(() => {
      api.send = jest.fn();
      api.sendBeacon = jest.fn();
    });

    test("debug should sendBeacon with level 'debug'", () => {
      api.debug(testEntries);
      expect(api.send).toHaveBeenLastCalledWith('debug', testEntries);
      expect(api.sendBeacon).toHaveBeenCalled();
    });
    test("info should create with level 'info'", () => {
      api.info(testEntries);
      expect(api.send).toHaveBeenLastCalledWith('info', testEntries);
      expect(api.sendBeacon).toHaveBeenCalled();
    });

    test("warn should create with level 'warn'", () => {
      api.warn(testEntries);
      expect(api.send).toHaveBeenLastCalledWith('warn', testEntries);
      expect(api.sendBeacon).toHaveBeenCalled();
    });

    test("error should create with level 'error'", () => {
      api.error(testEntries);
      expect(api.send).toHaveBeenLastCalledWith('error', testEntries);
      expect(api.sendBeacon).toHaveBeenCalled();
    });
  });
});
