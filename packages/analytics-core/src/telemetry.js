import AvAnalyticsPlugin from './plugin';

export default class AvTelemetryAnalytics extends AvAnalyticsPlugin {
  constructor(AvLogMessages, enabled) {
    super(enabled);
    this.AvLogMessages = AvLogMessages;
  }

  trackEvent(properties) {
    properties.telemetryBody.level = properties.telemetryBody.level || 'info';
    return this.AvLogMessages[properties.telemetryBody.level](properties);
  }

  trackPageView(url) {
    return this.trackEvent({ telemetryBody: { entries: { event: 'page', label: url } } });
  }
}
