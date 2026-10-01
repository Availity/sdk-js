import type { Mock } from 'vitest';
import { AvSplunkAnalytics } from '..';

describe('AvSplunkAnalytics', () => {
  let mockLog: { info: Mock; test: Mock; debug: Mock; warn: Mock; error: Mock };
  let mockAvSplunkAnalytics: AvSplunkAnalytics;

  beforeEach(() => {
    mockLog = {
      info: vi.fn(),
      test: vi.fn(),
      debug: vi.fn(),
      warn: vi.fn(),
      error: vi.fn(),
    };

    mockAvSplunkAnalytics = new AvSplunkAnalytics(mockLog);
  });

  test('AvSplunkAnalytics should be defined', () => {
    expect(mockAvSplunkAnalytics).toBeDefined();
  });

  test('trackEvent should call AvLogMessages[level]', () => {
    let level = 'info';
    mockAvSplunkAnalytics.trackEvent({ level });
    expect(mockLog.info).toHaveBeenCalledTimes(1);
    expect(mockLog.test).toHaveBeenCalledTimes(0);
    level = 'test';
    mockAvSplunkAnalytics.trackEvent({ level });
    expect(mockLog.info).toHaveBeenCalledTimes(1);
    expect(mockLog.test).toHaveBeenCalledTimes(1);
  });

  test("trackEvent should default level to 'info'", () => {
    mockAvSplunkAnalytics.trackEvent({});
    expect(mockLog.info).toHaveBeenCalledTimes(1);
    expect(mockLog.test).toHaveBeenCalledTimes(0);
  });

  test('trackEvent passes all properties through to AvLogMessages and defaults level to info', () => {
    // AvSplunkAnalytics.trackEvent only defaults `level` — it does not default `url`.
    // url defaulting (to location.href or 'N/A') belongs to AvAnalytics.trackEvent upstream.
    const startingObject: { message: string; url: string; level?: string } = {
      message: 'hello world',
      url: window.location.href || 'N/A',
    };
    const expectedCall = {
      ...startingObject,
      level: 'info', // defaulted by trackEvent since no level was supplied
    };
    mockAvSplunkAnalytics.trackEvent(startingObject);
    expect(mockLog.info).toHaveBeenCalledWith(expectedCall);

    const withLevel = {
      message: 'hello world',
      url: 'testUrl',
      level: 'test',
    };
    mockAvSplunkAnalytics.trackEvent(withLevel);
    expect(mockLog.test).toHaveBeenCalledWith(withLevel);
  });

  test("trackPageView should call trackEvent with event 'page' and passed in url", () => {
    const testUrl = 'testUrl';
    mockAvSplunkAnalytics.trackEvent = vi.fn();
    mockAvSplunkAnalytics.trackPageView(testUrl);
    expect(mockAvSplunkAnalytics.trackEvent).toHaveBeenCalledWith({
      event: 'page',
      url: testUrl,
    });
  });
});
