const isLeftClickEvent = event => event.button === 0;

const isModifiedEvent = event =>
  !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);

const trackMap = {
  select: ['focus', 'blur'],
  textarea: ['focus', 'blur'],
  input: ['focus', 'blur'],
  default: ['click'],
};

const isValidEventTypeOnTarget = event =>
  (trackMap[event.target.nodeName.toLowerCase()] || trackMap.default).indexOf(
    event.type
  ) > -1;

const isPluginEnabled = plugin =>
  typeof plugin.isEnabled === 'function'
    ? plugin.isEnabled()
    : plugin.isEnabled;

const camelCase = str =>
  str.replace(/-([a-z\d])/gi, (match, char) => char.toUpperCase());

/**
 * Polyfill for [`Event.composedPath()`][1].
 * https://gist.github.com/kleinfreund/e9787d73776c0e3750dcfcdc89f100ec
 */
const getComposedPath = node => {
  let parent;
  if (node.parentNode) {
    parent = node.parentNode;
  } else if (node.host) {
    parent = node.host;
  } else if (node.defaultView) {
    parent = node.defaultView;
  }

  if (parent !== undefined) {
    return [node].concat(getComposedPath(parent));
  }

  return [node];
};

export default class AvAnalytics {
  constructor(
    plugins,
    promise = Promise,
    pageTracking,
    autoTrack = true,
    options = {}
  ) {
    // if plugins or promise are undefined,
    // or if either is skipped and pageTracking boolean is used in their place
    if (!plugins || !promise) {
      throw new Error('[plugins], and [promise] must be defined');
    }

    this.plugins = Array.isArray(plugins) ? plugins : [plugins];
    this.pageTracking = !!pageTracking;
    this.Promise = promise;
    this.recursive = !!options.recursive;
    this.attributePrefix = options.attributePrefix || 'data-analytics';

    this.isPageTracking = false;
    this.hasInit = false;

    if (autoTrack) {
      document.body.addEventListener('click', this.handleEvent, true);
      document.body.addEventListener('focus', this.handleEvent, true);
      document.body.addEventListener('blur', this.handleEvent, true);
    }
  }

  handleEvent = event => {
    if (!this.validEvent(event)) {
      return;
    }

    const target = event.target || event.srcElement;
    const path = getComposedPath(event.target);

    let analyticAttrs = {};

    if (this.recursive) {
      // Reverse the array so we pull attributes from top down
      path.reverse().forEach(pth => {
        const attrs = this.getAnalyticAttrs(pth);

        analyticAttrs = { ...analyticAttrs, ...attrs };

        // To consider using the element it has to have analytics attrs
        if (Object.keys(attrs).length > 0) {
          analyticAttrs.elemId =
            pth.getAttribute('id') || pth.getAttribute('name');
        }
      });
    } else {
      analyticAttrs = this.getAnalyticAttrs(target);
    }

    if (
      !Object.keys(analyticAttrs).length > 0 ||
      (this.recursive && !analyticAttrs.action)
    ) {
      return;
    }

    analyticAttrs.action = analyticAttrs.action || event.type;
    analyticAttrs.elemId =
      analyticAttrs.elemId ||
      target.getAttribute('id') ||
      target.getAttribute('name');

    this.trackEvent(analyticAttrs);
  };

  validEvent = event =>
    isModifiedEvent(event) ||
    (event.type === 'click' && !isLeftClickEvent(event)) ||
    !isValidEventTypeOnTarget(event);

  getAnalyticAttrs = elem => {
    if (!elem.attributes) {
      return {};
    }

    const attrs = [...elem.attributes];
    const analyticAttrs = {};

    if (elem.nodeType === 1) {
      for (let i = attrs.length - 1; i >= 0; i--) {
        const { name } = attrs[i];
        if (name.indexOf(`${this.attributePrefix}-`) === 0) {
          const camelName = camelCase(
            name.slice(this.attributePrefix.length + 1)
          );
          analyticAttrs[camelName] = elem.getAttribute(name);
        }
      }
    }
    return analyticAttrs;
  };

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
    if (arguments.length > 0) {
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
