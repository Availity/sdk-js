import AvAnalyticsPlugin from './plugin';
import { DmaLogMessagesLike } from './dma';

export interface TelemetryEventProperties {
  customerId?: string;
  level?: string;
  payerId?: string;
  event?: string;
  action?: string;
  category?: string;
  label?: string;
  url?: string;
  [key: string]: unknown;
}

declare class AvTelemetryAnalytics extends AvAnalyticsPlugin {
  constructor(
    AvLogMessages: DmaLogMessagesLike,
    enabled: boolean | undefined,
    source_system: string,
    contact: string,
    owner: string,
    sessionId?: string
  );

  AvLogMessages: DmaLogMessagesLike;

  source_system: string;

  contact: string;

  owner: string;

  sessionId: string;

  trackEvent(properties: TelemetryEventProperties): Promise<unknown>;

  trackPageView(url?: string): Promise<unknown>;
}

export default AvTelemetryAnalytics;
