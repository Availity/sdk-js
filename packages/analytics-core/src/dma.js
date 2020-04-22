import * as yup from 'yup';
import AvAnalyticsPlugin from './plugin';

const schema = yup
  .object()
  .shape({
    level: yup.string().optional(),
    applicationId: yup.string().optional(),
    payerSpaceId: yup.string().optional(),
    label: yup.string().optional(),
    appName: yup.string().optional(),
    category: yup.string().optional(),
    section: yup.string().optional(),
    url: yup.string().optional(),
    value: yup.string().optional(),
    raw: yup.string().optional(),
    feed: yup.string().optional(),
    feedback: yup.string().optional(),
    feedbackName: yup.string().optional(),
    additionalFeedback: yup.string().optional(),
    smile: yup.string().optional(),
    surveyId: yup.string().optional(),
  })
  .noUnknown(true);

export default class AvDmaAnalytics extends AvAnalyticsPlugin {
  constructor(AvLogMessages, enabled) {
    super(enabled);
    this.AvLogMessages = AvLogMessages;
  }

  trackEvent(properties) {
    properties.level = properties.level || 'info';
    // joi validate the properties
    schema.validateSync(properties, {
      strict: true,
    });

    return this.AvLogMessages[properties.level](properties);
  }

  trackPageView(url) {
    return this.trackEvent({ event: 'page', url });
  }
}
