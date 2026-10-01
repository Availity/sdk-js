import type { Mock } from 'vitest';
import { AvTelemetryAnalytics } from '..';

describe('AvTelemetryAnalytics', () => {
  let mockLog: { info: Mock; test: Mock; debug: Mock; warn: Mock; error: Mock };
  let mockAvTelemetryAnalytics: AvTelemetryAnalytics;

  beforeEach(() => {
    mockLog = {
      info: vi.fn(),
      test: vi.fn(),
      debug: vi.fn(),
      warn: vi.fn(),
      error: vi.fn(),
    };

    mockAvTelemetryAnalytics = new AvTelemetryAnalytics(mockLog, false, 'testApp', 'AVOSS@availity.com', '555', '1234');
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

  test('trackEvent wraps properties into telemetryBody.entries and defaults level to info', () => {
    // AvTelemetryAnalytics.trackEvent does not default `url` — it passes
    // all non-destructured properties straight into telemetryBody.entries.
    // url defaulting (to location.href or 'N/A') belongs to AvAnalytics.trackEvent upstream.
    const startingObject: { message: string; url: string; level?: string; customerId: string } = {
      message: 'hello world',
      url: window.location.href || 'N/A',
      customerId: '0000',
    };
    let expectedCall = {
      contact: 'AVOSS@availity.com',
      customerId: '0000',
      owner: '555',
      sessionId: '1234',
      source_system: 'testApp',
      telemetryBody: {
        entries: {
          message: startingObject.message,
          url: startingObject.url,
        },
        level: 'info', // defaulted by trackEvent since no level was supplied
      },
      version: 'v1',
    };
    mockAvTelemetryAnalytics.trackEvent(startingObject);
    expect(mockLog.info).toHaveBeenCalledWith(expectedCall);

    const withLevel = {
      message: 'hello world',
      url: 'testUrl',
      level: 'test',
      customerId: '0000',
    };

    expectedCall = {
      contact: 'AVOSS@availity.com',
      customerId: '0000',
      owner: '555',
      sessionId: '1234',
      source_system: 'testApp',
      telemetryBody: {
        entries: {
          message: 'hello world',
          url: 'testUrl',
        },
        level: 'test',
      },
      version: 'v1',
    };
    mockAvTelemetryAnalytics.trackEvent(withLevel);
    expect(mockLog.test).toHaveBeenCalledWith(expectedCall);
  });

  test("trackPageView should call trackEvent with event 'page' and passed in url", () => {
    const testUrl = 'testUrl';
    mockAvTelemetryAnalytics.trackEvent = vi.fn();
    mockAvTelemetryAnalytics.trackPageView(testUrl);
    expect(mockAvTelemetryAnalytics.trackEvent).toHaveBeenCalledWith({
      action: 'load',
      category: 'testApp',
      customerId: '0000',
      event: 'page',
      label: 'page-load',
      url: testUrl,
    });
  });
});
