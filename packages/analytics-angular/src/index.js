import angular from 'angular';

import AvApiAngular from '@availity/api-angular';

import AvAnalyticsProvider from './analytics';

import AvAnalyticsPluginFactory from './plugin';
import AvSplunkAnalyticsFactory from './splunk';
import AvDmaAnalyticsFactory from './dma';

export default angular
  .module('availity.analytics', ['ng', AvApiAngular])
  .provider('AvAnalytics', AvAnalyticsProvider)
  .factory('AvAnalyticsPlugin', AvAnalyticsPluginFactory)
  .factory('AvSplunkAnalytics', AvSplunkAnalyticsFactory)
  .factory('AvDmaAnalytics', AvDmaAnalyticsFactory)
  .run(AvAnalytics => AvAnalytics.init()).name;
