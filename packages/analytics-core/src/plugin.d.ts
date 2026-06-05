export interface AnalyticsEventProperties {
  event?: string;
  action?: string;
  category?: string;
  label?: string;
  url?: string;
  level?: string;
  elemId?: string;
  overrides?: Record<string, unknown>;
  [key: string]: unknown;
}

declare class AvAnalyticsPlugin {
  constructor(enabled?: boolean);

  enabled: boolean;

  trackEvent(properties?: AnalyticsEventProperties): Promise<unknown> | void;

  trackPageView(url?: string): Promise<unknown> | void;

  isEnabled(): boolean;
}

export default AvAnalyticsPlugin;
