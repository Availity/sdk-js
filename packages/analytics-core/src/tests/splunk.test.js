import { AvSplunkAnalytics } from '..';

describe('AvSplunkAnalytics', () => {
  let mockLog;
  let mockAvSplunkAnalytics;

  beforeEach(() => {
    mockLog = {
      info: jest.fn(),
      test: jest.fn(),
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

  test("trackEvent should default properties.url to location.href or 'N/A'", () => {
    let startingObject = {
      message: 'hello world',
      url: window.location.href || 'N/A',
    };
    const expectedCall = {
      ...startingObject,
      url: window.location.href || 'N/A',
      level: 'info',
    };
    mockAvSplunkAnalytics.trackEvent(startingObject);
    expect(mockLog.info).toHaveBeenCalledWith(expectedCall);

    startingObject = {
      message: 'hello world',
      url: 'testUrl',
      level: 'test',
    };
    mockAvSplunkAnalytics.trackEvent(startingObject);
    expect(mockLog.test).toHaveBeenCalledWith(startingObject);
  });

  test("trackPageView should call trackEvent with event 'page' and passed in url", () => {
    const testUrl = 'testUrl';
    mockAvSplunkAnalytics.trackEvent = jest.fn();
    mockAvSplunkAnalytics.trackPageView(testUrl);
    expect(mockAvSplunkAnalytics.trackEvent).toHaveBeenCalledWith({
      event: 'page',
      url: testUrl,
    });
  });
});
