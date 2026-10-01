import { avLogMessagesApiV2 } from '@availity/api-axios';
import { AvDmaAnalytics } from '..';

vi.mock('@availity/api-axios');

describe('AvDmaAnalytics', () => {
  let mockAvDmaAnalytics: AvDmaAnalytics;

  beforeEach(() => {
    avLogMessagesApiV2.sendBeacon = vi.fn();
    // avLogMessagesApiV2.info = vi.fn;
    mockAvDmaAnalytics = new AvDmaAnalytics(avLogMessagesApiV2);
  });

  test('AvDmaAnalytics should be defined', () => {
    expect(mockAvDmaAnalytics).toBeDefined();
  });

  test('trackEvent should call AvLogMessages[level] (e.g. .info for level="info")', () => {
    const level = 'info';
    mockAvDmaAnalytics.trackEvent({ level, label: 'test' });
    expect(avLogMessagesApiV2.info).toHaveBeenCalledTimes(1);
  });

  test('trackEvent should not allow unknown keys', () => {
    const level = 'info';
    expect(() => {
      mockAvDmaAnalytics.trackEvent({ level, test: 'test' });
    }).toThrow();
  });
});
