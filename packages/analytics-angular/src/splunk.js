import { AvSplunkAnalytics } from '@availity/analytics-core';

function AvSplunkAnalyticsFactory(avLogMessagesResource) {
  return new AvSplunkAnalytics(avLogMessagesResource);
}

export default AvSplunkAnalyticsFactory;
