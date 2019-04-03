import AvAnalyticsPlugin from './plugin';

const requiredFields = [
  'tradingPartnerId',
  'customerId',
  'category',
  'applicationId',
];

export default class AvDmaAnalytics extends AvAnalyticsPlugin {
  constructor(AvLogMessages, enabled) {
    super(enabled);
    this.AvLogMessages = AvLogMessages;
  }

  trackEvent(properties) {
    if (!properties) return {};

    const logItems = {};

    if (properties.ApplicationId) {
      properties.applicationId = properties.ApplicationId;
      delete properties.ApplicationId;
    }

    if (properties.Category) {
      properties.category = properties.Category;
      delete properties.Category;
    }

    if (!properties.tradingPartnerId || properties.TradingPartnerId) {
      properties.tradingPartnerId = 'NA';
      delete properties.TradingPartnerId;
    }

    if (!properties.customerId || properties.CustomerId) {
      properties.customerId = 'NA';
      delete properties.CustomerId;
    }

    Object.keys(properties).forEach(key => {
      const isRequiredField = requiredFields.filter(field => key === field)
        .length;
      if (!isRequiredField) {
        logItems[key] = properties[key];

        delete properties[key];
      }
    });

    return this.AvLogMessages.send([{ ...properties, logItems }]);
  }

  trackPageView(url) {
    return this.trackEvent({ event: 'page', url });
  }
}
