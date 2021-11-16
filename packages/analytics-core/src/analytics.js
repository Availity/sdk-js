import {
  camelCase,
  getComposedPath,
  isLeftClickEvent,
  isModifiedEvent,
  isPluginEnabled,
  isValidEventTypeOnTarget,
} from './util';

export default class AvAnalytics {
  constructor(plugins, promise = Promise, pageTracking, autoTrack = true, options = {}) {
    // if plugins or promise are undefined,
    // or if either is skipped and pageTracking boolean is used in their place
    if (!plugins || !promise) {
      throw new Error('[plugins] and [promise] must be defined');
    }

    this.plugins = Array.isArray(plugins) ? plugins : [plugins];
    this.pageTracking = !!pageTracking;

    if (options.eventModifiers) {
      this.eventModifiers = Array.isArray(options.eventModifiers) ? options.eventModifiers : [options.eventModifiers];
    } else {
      this.eventModifiers = ['action'];
    }

    this.Promise = promise;
    this.recursive = !!options.recursive;
    this.attributePrefix = options.attributePrefix || 'data-analytics';

    this.isPageTracking = false;
    this.hasInit = false;

    if (autoTrack) {
      this.startAutoTrack();
    }
  }

  startAutoTrack = () => {
    document.body.addEventListener('click', this.handleEvent, true);
    document.body.addEventListener('focus', this.handleEvent, true);
    document.body.addEventListener('blur', this.handleEvent, true);
  };

  stopAutoTrack = () => {
    document.body.removeEventListener('click', this.handleEvent, true);
    document.body.removeEventListener('focus', this.handleEvent, true);
    document.body.removeEventListener('blur', this.handleEvent, true);
  };

  handleEvent = (event) => {
    if (this.invalidEvent(event)) {
      return;
    }
    const target = event.target || event.srcElement;
    const path = getComposedPath(event.target);

    let analyticAttrs = {};

    if (this.recursive) {
      // Reverse the array so we pull attributes from top down
      for (const pth of path.reverse()) {
        const attrs = this.getAnalyticAttrs(pth);

        analyticAttrs = { ...analyticAttrs, ...attrs };

        // To consider using the element it has to have analytics attrs
        if (Object.keys(attrs).length > 0) {
          analyticAttrs.elemId = pth.getAttribute('id') || pth.getAttribute('name') || undefined;
        }
      }
    } else {
      analyticAttrs = this.getAnalyticAttrs(target);
    }

    const actions = analyticAttrs ? this.eventModifiers.filter((mod) => analyticAttrs[mod] === event.type) : [];

    if (Object.keys(analyticAttrs).length === 0 || (this.recursive && actions.length === 0) || actions.length === 0) {
      return;
    }

    analyticAttrs.action = analyticAttrs.action || event.type;
    analyticAttrs.event = event.type;
    analyticAttrs.elemId =
      analyticAttrs.elemId || target.getAttribute('id') || target.getAttribute('name') || undefined;

    if (analyticAttrs.elemId === undefined) {
      delete analyticAttrs.elemId;
    }

    // remove keys for the click listeners
    for (const key of actions) {
      if (key !== 'action' && key !== 'event') {
        delete analyticAttrs[key];
      }
    }

    this.trackEvent(analyticAttrs);
  };

  invalidEvent = (event) =>
    isModifiedEvent(event) || (event.type === 'click' && !isLeftClickEvent(event)) || !isValidEventTypeOnTarget(event);

  getAnalyticAttrs = (elem) => {
    if (!elem.attributes) {
      return {};
    }

    const attrs = elem.attributes;
    const analyticAttrs = {};

    if (elem.nodeType === 1) {
      for (let i = attrs.length - 1; i >= 0; i--) {
        const { name } = attrs[i];
        if (name.indexOf(`${this.attributePrefix}-`) === 0) {
          const camelName = camelCase(name.slice(this.attributePrefix.length + 1));
          analyticAttrs[camelName] = elem.getAttribute(name);
        }
      }
    }
    return analyticAttrs;
  };

  startPageTracking = () => {
    if (!this.pageListener) {
      this.pageListener = this.trackPageView;
      window.addEventListener('hashchange', this.pageListener, false);
    }
  };

  stopPageTracking = () => {
    if (this.pageListener) {
      window.removeEventListener('hashchange', this.pageListener, false);
      delete this.pageListener;
    }
  };

  init = () => {
    this.setPageTracking();

    for (const plugin of this.plugins) {
      if (isPluginEnabled(plugin) && typeof plugin.init === 'function') {
        plugin.init();
      }
    }
  };

  setPageTracking = (value) => {
    // eslint-disable-next-line eqeqeq
    if (value != undefined) {
      this.pageTracking = !!value;
    }

    const canPageTrack = typeof this.startPageTracking === 'function' && typeof this.stopPageTracking === 'function';

    if (canPageTrack && this.pageTracking !== this.isPageTracking) {
      if (this.pageTracking) {
        this.startPageTracking();
      } else {
        this.stopPageTracking();
      }
      this.isPageTracking = this.pageTracking;
    }
  };

  trackEvent = (properties) => {
    const promises = [];
    properties.url = properties.url || window.location.href || 'N/A';

    for (const plugin of this.plugins) {
      const props = {
        ...properties,
      };

      if (isPluginEnabled(plugin) && typeof plugin.trackEvent === 'function') {
        promises.push(plugin.trackEvent(props));
      }
    }
    return this.Promise.all(promises);
  };

  trackPageView = (url) => {
    // hashchanges are an object so we want to grab the new url from it
    if (typeof url === 'object') {
      url = url.newURL;
    }

    url = url || window.location.href;
    const promises = [];
    for (const plugin of this.plugins) {
      if (isPluginEnabled(plugin) && typeof plugin.trackPageView === 'function') {
        promises.push(plugin.trackPageView(url));
      }
    }
    return this.Promise.all(promises);
  };
}
