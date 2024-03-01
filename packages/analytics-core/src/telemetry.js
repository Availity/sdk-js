import AvAnalyticsPlugin from './plugin';

export default class AvTelemetryAnalytics extends AvAnalyticsPlugin {
  constructor(AvLogMessages, enabled) {
    super(enabled);
    this.AvLogMessages = AvLogMessages;
  }

  trackEvent({ action, category, event, label, level, ...properties }) {
    const payload = {
      version: 'v1',
      telemetryBody: {
        level: level || 'info',
        entries: {
          ...properties,
        },
      },
    };
    if (action) payload.telemetryBody.entries.action = action;
    if (label) payload.telemetryBody.entries.label = label;
    if (event) payload.telemetryBody.entries.event = event;
    if (category) payload.telemetryBody.entries.category = category;

    return this.AvLogMessages[payload.telemetryBody.level](payload);
  }

  trackPageView(url) {
    return this.trackEvent({ event: 'page', label: url });
  }
}
