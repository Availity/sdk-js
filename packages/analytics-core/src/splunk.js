import { AvAnalyticsPlugin } from './plugin';

export class AvSplunkAnalytics extends AvAnalyticsPlugin {
  constructor(AvLogMessages, enabled) {
    super(enabled);
    this.AvLogMessages = AvLogMessages;
  }

  trackEvent(properties) {
    properties.url = properties.url || window.location.href || 'N/A';
    properties.level = properties.level || 'info';
    return this.AvLogMessages[properties.level](properties);
  }

  trackPageView(url) {
    return this.trackEvent({ event: 'page', url });
  }
}
