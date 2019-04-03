import { AvAnalytics } from '@availity/analytics-core';

export default class AvAnalyticsProvider {
  constructor() {
    this.plugins = ['AvSplunkAnalytics'];
    this.PageEvent = '$locationChangeSuccess';
    this.virtualPageTracking = true;

    this.$get.$inject = ['$log', '$injector', '$q', '$rootScope'];
  }

  registerPlugins(plugins) {
    if (typeof plugins === 'string') {
      this.plugins = [plugins];
    } else if (Array.isArray(plugins)) {
      this.plugins = plugins;
    } else {
      throw new TypeError(
        'AvAnalyticsProvider.registerPlugins() expects a string or an array.'
      );
    }
  }

  setVirtualPageTracking(value) {
    if (arguments.length > 0) {
      this.virtualPageTracking = !!value;
    }
  }

  $get($log, $injector, $q, $rootScope) {
    const self = this;

    class AvAnalyticsAngular extends AvAnalytics {
      constructor() {
        let startingPlugins = ['AvSplunkAnalytics'];
        if (Array.isArray(self.plugins) && self.plugins.length > 0) {
          startingPlugins = self.plugins;
        }
        const plugins = [];
        startingPlugins.forEach(plugin => {
          if (typeof plugin === 'string') {
            try {
              plugins.push($injector.get(plugin));
            } catch (error) {
              $log.error(`Could not load ${plugin} plugin`);
            }
          } else {
            plugins.push(plugin);
          }
        });
        super(plugins, $q, self.virtualPageTracking);

        this.pageListener = undefined;
      }

      startPageTracking = () => {
        if (!this.pageListener) {
          this.pageListener = $rootScope.$on(self.PageEvent, () => {
            this.trackPageView();
          });
        }
      };

      stopPageTracking = () => {
        if (this.pageListener) {
          this.pageListener();
          delete this.pageListener;
        }
      };
    }

    return new AvAnalyticsAngular();
  }
}
