import AvAnalyticsPlugin, { AnalyticsEventProperties } from './plugin';
import { DmaLogMessagesLike } from './dma';

declare class AvSplunkAnalytics extends AvAnalyticsPlugin {
  constructor(AvLogMessages: DmaLogMessagesLike, enabled?: boolean);

  AvLogMessages: DmaLogMessagesLike;

  trackEvent(properties: AnalyticsEventProperties): Promise<unknown>;

  trackPageView(url: string): Promise<unknown>;
}

export default AvSplunkAnalytics;
