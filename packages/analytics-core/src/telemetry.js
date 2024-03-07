import { v4 as uuidv4 } from 'uuid';
import AvAnalyticsPlugin from './plugin';

export default class AvTelemetryAnalytics extends AvAnalyticsPlugin {
  constructor(AvLogMessages, enabled, source_system, contact, sessionId) {
    super(enabled);
    this.AvLogMessages = AvLogMessages;

    if (!source_system) throw new Error('source_system is required');
    if (!contact) throw new Error('contact is required');
    this.source_system = source_system;
    this.contact = contact;
    this.sessionId = sessionId || uuidv4();
  }

  trackEvent({ customerId, level, payerId, ...properties }) {
    const payload = {
      customerId,
      contact: this.contact,
      source_system: this.source_system,
      version: 'v1',
      sessionId: this.sessionId,
      telemetryBody: {
        level: level || 'info',
        entries: {
          ...properties,
        },
      },
    };

    if (payerId) payload.payerId = payerId;

    return this.AvLogMessages[payload.telemetryBody.level](payload);
  }

  trackPageView(url) {
    return this.trackEvent({
      event: 'page',
      action: 'load',
      category: this.source_system,
      label: 'page-load',
      url,
      customerId: '0000',
    });
  }
}
