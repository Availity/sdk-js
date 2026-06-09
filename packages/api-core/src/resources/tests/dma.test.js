import AvLogMessagesV2 from '../dma';

const mockHttp = vi.fn(() => Promise.resolve({}));

describe('AvLogMessages', () => {
  let api;

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('should be defined', () => {
    api = new AvLogMessagesV2({ http: mockHttp });
    expect(api).toBeDefined();
  });

  test('send() should return formatted fields with level and entries', () => {
    api = new AvLogMessagesV2({ http: mockHttp });
    const fields = api.send('info', { testField1: 'test1', testField2: 'test2' });
    expect(fields).toContain('level=info&entries.testField1=test1&entries.testField2=test2');
  });

  describe('log levels', () => {
    const testEntries = { a: '1', b: '2' };

    beforeEach(() => {
      api = new AvLogMessagesV2({ http: mockHttp });
      api.send = vi.fn();
      api.sendBeacon = vi.fn();
    });

    test("debug should sendBeacon with level 'debug'", () => {
      api.debug(testEntries);
      expect(api.send).toHaveBeenLastCalledWith('debug', testEntries);
      expect(api.sendBeacon).toHaveBeenCalled();
    });

    test("info should sendBeacon with level 'info'", () => {
      api.info(testEntries);
      expect(api.send).toHaveBeenLastCalledWith('info', testEntries);
      expect(api.sendBeacon).toHaveBeenCalled();
    });

    test("warn should sendBeacon with level 'warn'", () => {
      api.warn(testEntries);
      expect(api.send).toHaveBeenLastCalledWith('warn', testEntries);
      expect(api.sendBeacon).toHaveBeenCalled();
    });

    test("error should sendBeacon with level 'error'", () => {
      api.error(testEntries);
      expect(api.send).toHaveBeenLastCalledWith('error', testEntries);
      expect(api.sendBeacon).toHaveBeenCalled();
    });
  });
});
