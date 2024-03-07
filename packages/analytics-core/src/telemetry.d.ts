/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import AvAnalyticsPlugin from './plugin';

declare class AvTelemetryAnalytics extends AvAnalyticsPlugin {
  constructor(AvLogMessages: any, enabled?: boolean, source_system: string, contact: string, sessionId?: string);

  trackEvent(properties: any): any;

  trackPageView(url: string): any;
}

export default AvTelemetryAnalytics;
