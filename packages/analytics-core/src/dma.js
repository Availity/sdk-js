import AvAnalyticsPlugin from './plugin';

export default class AvDmaAnalytics extends AvAnalyticsPlugin {
  constructor(AvLogMessages, enabled) {
    super(enabled);
    this.AvLogMessages = AvLogMessages;
  }

  trackEvent(properties) {
    properties.level = properties.level || 'info';
    return this.AvLogMessages.send(properties);
  }

  trackPageView(url) {
    return this.trackEvent({ event: 'page', url });
  }
}
