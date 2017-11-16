export class AvAnalytics {
  constructor(plugins, promise, pageTracking) {
    // if plugins or promise are undefined, or if either is skipped and pageTracking boolean is used in their place
    if (
      !plugins ||
      !promise ||
      (arguments.length < 3 &&
        typeof arguments[arguments.length - 1] === 'boolean')
    ) {
      throw new Error('[plugins], and [promise] must be defined');
    }

    this.plugins = Array.isArray(plugins) ? plugins : [plugins];
    this.pageTracking = !!pageTracking;
    this.Promise = promise;

    // reserved values
    this.startPageTracking;
    this.stopPageTracking;
    this.isPageTracking = false;
    this.hasInit = false;
  }

  init() {
    this.setPageTracking();

    this.plugins.forEach(plugin => {
      if (
        (typeof plugin.isEnabled === 'function'
          ? plugin.isEnabled()
          : plugin.isEnabled) &&
        typeof plugin.init === 'function'
      ) {
        plugin.init();
      }
    });
  }

  setPageTracking(value) {
    if (arguments.length) {
      this.pageTracking = !!value;
    }
    const canPageTrack =
      typeof this.startPageTracking === 'function' &&
      typeof this.stopPageTracking === 'function';
    if (canPageTrack && this.pageTracking !== this.isPageTracking) {
      if (this.pageTracking) {
        this.startPageTracking();
      } else {
        this.stopPageTracking();
      }
      this.isPageTracking = this.pageTracking;
    }
  }

  trackEvent(properties) {
    const promises = [];
    this.plugins.forEach(plugin => {
      if (
        (typeof plugin.isEnabled === 'function'
          ? plugin.isEnabled()
          : plugin.isEnabled) &&
        typeof plugin.trackEvent === 'function'
      ) {
        promises.push(plugin.trackEvent(properties));
      }
    });
    return this.Promise.all(promises);
  }

  trackPageView(url) {
    url = url || window.location.href;
    const promises = [];
    this.plugins.forEach(plugin => {
      if (
        (typeof plugin.isEnabled === 'function'
          ? plugin.isEnabled()
          : plugin.isEnabled) &&
        typeof plugin.trackPageView === 'function'
      ) {
        promises.push(plugin.trackPageView(url));
      }
    });
    return this.Promise.all(promises);
  }
}
