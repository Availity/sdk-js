import { AvSplunkAnalytics } from '@availity/analytics-core';

function AvSplunkAnalyticsFactory(AvLogMessagesResource) {
  return new AvSplunkAnalytics(AvLogMessagesResource);
}

AvSplunkAnalyticsFactory.$inject = ['AvLogMessagesResource'];

export default AvSplunkAnalyticsFactory;
