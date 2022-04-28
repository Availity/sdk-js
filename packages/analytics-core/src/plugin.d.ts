/* eslint-disable @typescript-eslint/no-explicit-any */
declare class AvAnalyticsPlugin {
  constructor(enabled?: boolean);

  trackEvent(): any;

  trackPageView(): any;

  isEnabled(): boolean;
}

export default AvAnalyticsPlugin;
