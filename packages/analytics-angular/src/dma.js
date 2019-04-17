import { AvDmaAnalytics } from '@availity/analytics-core';

function AvDmaAnalyticsFactory(avLogMessagesApi) {
  return new AvDmaAnalytics(avLogMessagesApi);
}

export default AvDmaAnalyticsFactory;
