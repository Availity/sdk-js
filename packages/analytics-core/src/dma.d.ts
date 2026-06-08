import AvAnalyticsPlugin, { AnalyticsEventProperties } from './plugin';

export interface DmaLogMessagesLike {
  debug(entries: Record<string, unknown>): Promise<unknown>;
  info(entries: Record<string, unknown>): Promise<unknown>;
  warn(entries: Record<string, unknown>): Promise<unknown>;
  error(entries: Record<string, unknown>): Promise<unknown>;
}

declare class AvDmaAnalytics extends AvAnalyticsPlugin {
  constructor(AvLogMessages: DmaLogMessagesLike, enabled?: boolean);

  AvLogMessages: DmaLogMessagesLike;

  trackEvent(properties: AnalyticsEventProperties): Promise<unknown>;

  trackPageView(url: string): Promise<unknown>;
}

export default AvDmaAnalytics;
