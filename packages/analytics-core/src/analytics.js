import camelcase from 'camelcase';

const isLeftClickEvent = event => event.button === 0;

const isModifiedEvent = event =>
  !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);

const trackMap = {
  select: ['focus', 'blur'],
  textarea: ['focus', 'blur'],
  input: ['focus', 'blur'],
  default: ['click']
}

const isValidEventTypeOnTarget = event => (trackMap[event.target.nodeName.toLowerCase()] || trackMap.default).indexOf(event.type) > -1;

const isPluginEnabled = plugin =>
  typeof plugin.isEnabled === 'function'
    ? plugin.isEnabled()
    : plugin.isEnabled;

const getAnalyticAttrs = elem => {
  const attrs = [...elem.attributes];
  const analyticAttrs = {};

  if (elem.nodeType === 1) {
    for(let i = attrs.length - 1; i >= 0; i--) {
      const { name } = attrs[i];
      if (name.indexOf('data-analytics-') === 0) {
        const camelName = camelcase(name.slice(15));
        analyticAttrs[camelName] = elem.getAttribute(name);
      }
    }
  }
  return analyticAttrs;
}

export default class AvAnalytics {
  constructor(plugins, promise = Promise, pageTracking, autoTrack = true) {
    // if plugins or promise are undefined,
    // or if either is skipped and pageTracking boolean is used in their place
    if (!plugins || !promise) {
      throw new Error('[plugins], and [promise] must be defined');
    }

    this.plugins = Array.isArray(plugins) ? plugins : [plugins];
    this.pageTracking = !!pageTracking;
    this.Promise = promise;

    this.isPageTracking = false;
    this.hasInit = false;

    if (autoTrack) {
      document.body.addEventListener('click', this.handleEvent, true);
      document.body.addEventListener('focus', this.handleEvent, true);
      document.body.addEventListener('blur', this.handleEvent, true);
    }
  }

  handleEvent = event => {
    if (isModifiedEvent(event) || !isLeftClickEvent(event) || !isValidEventTypeOnTarget(event)) {
      return;
    }
    const target = event.target || event.srcElement;
    const analyticAttrs = getAnalyticAttrs(target);

    if (!Object.keys(analyticAttrs).length) {
        return;
    }
    analyticAttrs.elemId = analyticAttrs.elemId || target.getAttribute('id') || target.getAttribute('name')
    analyticAttrs.action = analyticAttrs.action || event.type;
    this.trackEvent(analyticAttrs);
  }

  startPageTracking() {
    if (!this.pageListener) {
      this.pageListener = this.trackPageView;
      window.addEventListener('hashchange', this.pageListener, false);
    }
  }

  stopPageTracking() {
    if (this.pageListener) {
      window.removeEventListener('hashchange', this.pageListener, false);
      delete this.pageListener;
    }
  }

  init() {
    this.setPageTracking();

    this.plugins.forEach(plugin => {
      if (isPluginEnabled(plugin) && typeof plugin.init === 'function') {
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
    properties.url = properties.url || window.location.href || 'N/A';
    this.plugins.forEach(plugin => {
      if (isPluginEnabled(plugin) && typeof plugin.trackEvent === 'function') {
        promises.push(plugin.trackEvent(properties));
      }
    });
    return this.Promise.all(promises);
  }

  trackPageView = url => {
    url = url || window.location.href;
    const promises = [];
    this.plugins.forEach(plugin => {
      if (
        isPluginEnabled(plugin) &&
        typeof plugin.trackPageView === 'function'
      ) {
        promises.push(plugin.trackPageView(url));
      }
    });
    return this.Promise.all(promises);
  };
}
