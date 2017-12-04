import { AvSplunkAnalytics } from '@availity/analytics-core';

function AvSplunkAnalyticsFactory(avLogMessagesApi) {
  return new AvSplunkAnalytics(avLogMessagesApi);
}

export default AvSplunkAnalyticsFactory;
