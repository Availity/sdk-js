import { AvTelemetryAnalytics } from '..';

describe('AvTelemetryAnalytics', () => {
  let mockLog: { info: () => void; test: () => void };
  let mockAvTelemetryAnalytics: AvTelemetryAnalytics;

  beforeEach(() => {
    mockLog = {
      info: jest.fn(),
      test: jest.fn(),
    };

    mockAvTelemetryAnalytics = new AvTelemetryAnalytics(mockLog);
  });

  test('AvTelemetryAnalytics should be defined', () => {
    expect(mockAvTelemetryAnalytics).toBeDefined();
  });

  test('trackEvent should call AvLogMessages[level]', () => {
    let level = 'info';
    mockAvTelemetryAnalytics.trackEvent({ level });
    expect(mockLog.info).toHaveBeenCalledTimes(1);
    expect(mockLog.test).toHaveBeenCalledTimes(0);
    level = 'test';
    mockAvTelemetryAnalytics.trackEvent({ level });
    expect(mockLog.info).toHaveBeenCalledTimes(1);
    expect(mockLog.test).toHaveBeenCalledTimes(1);
  });

  test("trackEvent should default level to 'info'", () => {
    mockAvTelemetryAnalytics.trackEvent({});
    expect(mockLog.info).toHaveBeenCalledTimes(1);
    expect(mockLog.test).toHaveBeenCalledTimes(0);
  });

  test("trackEvent should default properties.url to location.href or 'N/A'", () => {
    let startingObject: { message: string; url: string; level?: string } = {
      message: 'hello world',
      url: window.location.href || 'N/A',
    };
    let expectedCall = {
      telemetryBody: {
        entries: {
          ...startingObject,
          url: window.location.href || 'N/A',
        },
        level: 'info',
      },
      version: 'v1',
    };
    mockAvTelemetryAnalytics.trackEvent(startingObject);
    expect(mockLog.info).toHaveBeenCalledWith(expectedCall);

    startingObject = {
      message: 'hello world',
      url: 'testUrl',
      level: 'test',
    };

    expectedCall = {
      telemetryBody: {
        entries: {
          message: 'hello world',
          url: 'testUrl',
        },
        level: 'test',
      },
      version: 'v1',
    };
    mockAvTelemetryAnalytics.trackEvent(startingObject);
    expect(mockLog.test).toHaveBeenCalledWith(expectedCall);
  });

  test("trackPageView should call trackEvent with event 'page' and passed in url", () => {
    const testUrl = 'testUrl';
    mockAvTelemetryAnalytics.trackEvent = jest.fn();
    mockAvTelemetryAnalytics.trackPageView(testUrl);
    expect(mockAvTelemetryAnalytics.trackEvent).toHaveBeenCalledWith({
      event: 'page',
      label: testUrl,
    });
  });
});
