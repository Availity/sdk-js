import AvAnalyticsPlugin from './plugin';

declare class AvSplunkAnalytics extends AvAnalyticsPlugin {
  constructor(AvLogMessages: any, enabled?: boolean);

  trackEvent(properties: any): any;

  trackPageView(url: string): any;
}

export default AvSplunkAnalytics;
