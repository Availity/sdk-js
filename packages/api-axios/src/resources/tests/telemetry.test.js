import AvTelemetryApi from '../telemetry';

describe('AvTelemetryApi', () => {
  let api;
  beforeEach(() => {
    api = new AvTelemetryApi();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should be defined', () => {
    expect(api).toBeDefined();
  });

  test('url should be correct', () => {
    expect(api.getUrl(api.config())).toBe('/ms/api/availity/internal/spc/analytics/telemetry');
  });

  test('send() should return {level, entries}', () => {
    api = new AvTelemetryApi();
    const level = 'testLevel';
    const data = {
      customerId: '1194',
      telemetryBody: {
        level: 'l1',
        source_system: 'ss1',
        version: 'v1',
        entries: {
          event: 'e1',
          action: 'a1',
          label: 'l1',
          category: 'c1',
        },
      },
    };
    const sent = api.send(level, data);

    const params = new URLSearchParams(sent);

    expect(params.get('customerId')).toBe('1194');
    expect(params.get('telemetryBody.level')).toBe('testLevel');
    expect(params.get('telemetryBody.source_system')).toBe('ss1');
    expect(params.get('telemetryBody.version')).toBe('v1');
    expect(params.get('telemetryBody.entries.event')).toBe('e1');
    expect(params.get('telemetryBody.entries.action')).toBe('a1');
    expect(params.get('telemetryBody.entries.label')).toBe('l1');
    expect(params.get('telemetryBody.entries.category')).toBe('c1');
  });

  describe('log levels', () => {
    const testData = {
      customerId: '1194',
      telemetryBody: {
        level: 'l1',
        source_system: 'ss1',
        version: 'v1',
        entries: {
          event: 'e1',
          action: 'a1',
          label: 'l1',
          category: 'c1',
        },
      },
    };

    beforeEach(() => {
      api.send = jest.fn();
      api.sendBeacon = jest.fn();
    });

    test("debug should sendBeacon with level 'debug'", () => {
      api.debug(testData);
      expect(api.send).toHaveBeenLastCalledWith('debug', testData);
      expect(api.sendBeacon).toHaveBeenCalled();
    });
    test("info should create with level 'info'", () => {
      api.info(testData);
      expect(api.send).toHaveBeenLastCalledWith('info', testData);
      expect(api.sendBeacon).toHaveBeenCalled();
    });

    test("warn should create with level 'warn'", () => {
      api.warn(testData);
      expect(api.send).toHaveBeenLastCalledWith('warn', testData);
      expect(api.sendBeacon).toHaveBeenCalled();
    });

    test("error should create with level 'error'", () => {
      api.error(testData);
      expect(api.send).toHaveBeenLastCalledWith('error', testData);
      expect(api.sendBeacon).toHaveBeenCalled();
    });
  });
});
