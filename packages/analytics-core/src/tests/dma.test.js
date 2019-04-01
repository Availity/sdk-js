import { AvDmaAnalytics } from '..';

describe('AvSplunkAnalytics', () => {
  let mockLog;
  let mockAvSplunkAnalytics;

  beforeEach(() => {
    mockLog = {
      send: jest.fn(),
    };

    mockAvSplunkAnalytics = new AvDmaAnalytics(mockLog);
  });

  test('AvSplunkAnalytics should be defined', () => {
    expect(mockAvSplunkAnalytics).toBeDefined();
  });

  test('trackEvent should call AvLogMessages.send', () => {
    const level = 'info';
    mockAvSplunkAnalytics.trackEvent({ level });
    expect(mockLog.send).toHaveBeenCalledTimes(1);
  });
});
