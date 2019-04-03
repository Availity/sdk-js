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

  test('should fill in customerId and TradingPartnerId if empty', () => {
    const level = 'info';
    mockAvSplunkAnalytics.trackEvent({ level });
    expect(mockLog.send).toHaveBeenCalledWith(
      expect.arrayContaining([
        { customerId: 'NA', tradingPartnerId: 'NA', logItems: { level } },
      ])
    );
  });
});
