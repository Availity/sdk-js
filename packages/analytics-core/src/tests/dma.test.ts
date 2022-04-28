import { avLogMessagesApiV2 } from '@availity/api-axios';
import { AvDmaAnalytics } from '..';

jest.mock('@availity/api-axios');

describe('AvSplunkAnalytics', () => {
  let mockAvSplunkAnalytics: AvDmaAnalytics;

  beforeEach(() => {
    avLogMessagesApiV2.sendBeacon = jest.fn();
    // avLogMessagesApiV2.info = jest.fn;
    mockAvSplunkAnalytics = new AvDmaAnalytics(avLogMessagesApiV2);
  });

  test('AvSplunkAnalytics should be defined', () => {
    expect(mockAvSplunkAnalytics).toBeDefined();
  });

  test('trackEvent should call AvLogMessages.send', () => {
    const level = 'info';
    mockAvSplunkAnalytics.trackEvent({ level, label: 'test' });
    expect(avLogMessagesApiV2.info).toHaveBeenCalledTimes(1);
  });

  test('trackEvent should not allow unknown keys', () => {
    const level = 'info';
    expect(() => {
      mockAvSplunkAnalytics.trackEvent({ level, test: 'test' });
    }).toThrow();
  });
});
