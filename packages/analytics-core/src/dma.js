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

    const data = {};

    if (properties.ApplicationId) {
      properties.applicationId = properties.ApplicationId;
      delete properties.ApplicationId;
    }

    if (properties.Category) {
      properties.category = properties.Category;
      delete properties.Category;
    }

    if (properties.tradingPartnerId || properties.TradingPartnerId) {
      properties.tradingPartnerId =
        properties.tradingPartnerId || properties.TradingPartnerId;
      delete properties.TradingPartnerId;
    } else {
      properties.tradingPartnerId = 'NA';
    }

    if (properties.customerId || properties.CustomerId) {
      properties.customerId = properties.customerId || properties.CustomerId;
      delete properties.CustomerId;
    } else {
      properties.customerId = 'NA';
    }

    Object.keys(properties).forEach(key => {
      const isRequiredField = requiredFields.filter(field => key === field)
        .length;
      if (!isRequiredField) {
        data[key] = properties[key];

        delete properties[key];
      }
    });

    return this.AvLogMessages.send([{ ...properties, data }]);
  }

  trackPageView(url) {
    return this.trackEvent({ event: 'page', url });
  }
}
