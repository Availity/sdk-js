/* eslint-disable unicorn/prefer-dom-node-dataset */
import { AvAnalytics } from '..';

type MockPlugin = {
  isEnabled: jest.Mock;
  init: jest.Mock | string;
  trackEvent: jest.Mock | string;
  trackPageView: jest.Mock | string;
};

function makePlugin() {
  return {
    isEnabled: jest.fn(() => true),
    init: jest.fn(),
    trackEvent: jest.fn(),
    trackPageView: jest.fn(),
  };
}

describe('AvAnalytics', () => {
  let mockAvAnalytics: AvAnalytics;

  test('AvAnalytics should be defined', () => {
    const plugins = [makePlugin()];
    mockAvAnalytics = new AvAnalytics(plugins, Promise, true);
    expect(mockAvAnalytics).toBeDefined();
    mockAvAnalytics = new AvAnalytics(plugins, Promise);
    expect(mockAvAnalytics).toBeDefined();
  });

  test('AvAnalytics should throw error without plugins or Promise', () => {
    expect(() => {
      // @ts-expect-error: allow error for testing
      mockAvAnalytics = new AvAnalytics();
    }).toThrow('[plugins] and [promise] must be defined');
  });

  test('AvAnalytics should cast plugins to an array', () => {
    const plugin = makePlugin();
    mockAvAnalytics = new AvAnalytics(plugin, Promise);
    expect(mockAvAnalytics.plugins).toEqual([plugin]);
  });

  test('AvAnalytics should use custom configs', () => {
    mockAvAnalytics = new AvAnalytics([], Promise, true, true, {
      attributePrefix: 'some-attr',
      recursive: true,
    });
    expect(mockAvAnalytics.attributePrefix).toBe('some-attr');
    expect(mockAvAnalytics.recursive).toBe(true);
  });

  describe('setPageTracking', () => {
    beforeEach(() => {
      const plugins = [makePlugin()];
      mockAvAnalytics = new AvAnalytics(plugins, Promise);
    });

    test('passing in argument should change value of pageTracking', () => {
      const initialTracking = true;
      const setPageTracking = !initialTracking;

      mockAvAnalytics.pageTracking = initialTracking;

      mockAvAnalytics.setPageTracking(setPageTracking);
      expect(mockAvAnalytics.pageTracking).toBe(setPageTracking);
    });

    test('with functions defined, will only call if pageTracking is opposite isPageTracking', () => {
      mockAvAnalytics.startPageTracking = jest.fn();
      mockAvAnalytics.stopPageTracking = jest.fn();

      let testValue = true;
      mockAvAnalytics.pageTracking = testValue;
      mockAvAnalytics.isPageTracking = testValue;
      mockAvAnalytics.setPageTracking();
      expect(mockAvAnalytics.startPageTracking).not.toHaveBeenCalled();
      expect(mockAvAnalytics.stopPageTracking).not.toHaveBeenCalled();

      testValue = false;
      mockAvAnalytics.pageTracking = testValue;
      mockAvAnalytics.isPageTracking = testValue;
      mockAvAnalytics.setPageTracking();
      expect(mockAvAnalytics.startPageTracking).not.toHaveBeenCalled();
      expect(mockAvAnalytics.stopPageTracking).not.toHaveBeenCalled();
    });

    test('with functions defined, will start/stop tracking based on pageTracking value', () => {
      mockAvAnalytics.startPageTracking = jest.fn();
      mockAvAnalytics.stopPageTracking = jest.fn();

      let testValue = true;
      mockAvAnalytics.pageTracking = testValue;
      mockAvAnalytics.isPageTracking = !testValue;

      mockAvAnalytics.setPageTracking();
      expect(mockAvAnalytics.startPageTracking).toHaveBeenCalledTimes(1);
      expect(mockAvAnalytics.stopPageTracking).toHaveBeenCalledTimes(0);
      expect(mockAvAnalytics.isPageTracking).toBe(testValue);

      testValue = false;
      mockAvAnalytics.pageTracking = testValue;
      mockAvAnalytics.isPageTracking = !testValue;

      mockAvAnalytics.setPageTracking();
      expect(mockAvAnalytics.startPageTracking).toHaveBeenCalledTimes(1);
      expect(mockAvAnalytics.stopPageTracking).toHaveBeenCalledTimes(1);
      expect(mockAvAnalytics.isPageTracking).toBe(testValue);
    });
  });

  describe('init', () => {
    let plugins: [MockPlugin, MockPlugin];
    beforeEach(() => {
      plugins = [makePlugin(), makePlugin()];
      mockAvAnalytics = new AvAnalytics(plugins, Promise);
      mockAvAnalytics.setPageTracking = jest.fn();
    });

    test('should call setPageTracking', () => {
      mockAvAnalytics.init();
      expect(mockAvAnalytics.setPageTracking).toHaveBeenCalled();
    });

    test('should check each plugin is enabled', () => {
      mockAvAnalytics.init();
      for (const plugin of plugins) {
        expect(plugin.isEnabled).toHaveBeenCalled();
      }
    });

    test('should call init on enabled plugins', () => {
      mockAvAnalytics.init();
      for (const plugin of plugins) {
        expect(plugin.init).toHaveBeenCalledTimes(1);
      }

      plugins[0].isEnabled.mockImplementationOnce(() => false);
      mockAvAnalytics.init();
      expect(plugins[0].init).toHaveBeenCalledTimes(1);
      expect(plugins[1].init).toHaveBeenCalledTimes(2);
    });

    test('should skip plugins without init function', () => {
      plugins[1].init = 'test';
      mockAvAnalytics.init();
      expect(plugins[0].init).toHaveBeenCalled();
    });
  });

  describe('event tracking', () => {
    let plugins: [MockPlugin, MockPlugin, MockPlugin];
    beforeEach(() => {
      plugins = [makePlugin(), makePlugin(), makePlugin()];

      mockAvAnalytics = new AvAnalytics(plugins, Promise);

      plugins[0].isEnabled.mockImplementation(() => false);
      plugins[1].trackEvent = 'test';
      plugins[2].trackPageView = 'test';
    });

    test('trackEvent should call trackEvent on enabled plugins with properties', async () => {
      const mockProperties = {};
      await mockAvAnalytics.trackEvent(mockProperties);

      expect(plugins[0].trackEvent).not.toHaveBeenCalled();
      expect(plugins[2].trackEvent).toHaveBeenCalledWith(mockProperties);
    });

    test('trackEvent should call trackEvent on enabled plugins with url', async () => {
      const mockProperties: { url?: string } = {};
      await mockAvAnalytics.trackEvent(mockProperties);

      expect(plugins[0].trackEvent).not.toHaveBeenCalled();
      expect(mockProperties.url).toBeDefined();
      expect(plugins[2].trackEvent).toHaveBeenCalledWith(mockProperties);
    });

    test('trackPageView should call trackPageView on enabled plugins with properties', async () => {
      const mockUrl = 'testProperties';
      await mockAvAnalytics.trackPageView(mockUrl);

      expect(plugins[0].trackPageView).not.toHaveBeenCalled();
      expect(plugins[1].trackPageView).toHaveBeenCalledWith(mockUrl);
    });
  });

  describe('getAnalyticAttrs with nested overrides', () => {
    let logPlugin: MockPlugin & { AvLogMessages?: { defaultConfig: { name: string } } };
    let mockApiV2: { defaultConfig: { name: string } };
    let mockApiV3: { defaultConfig: { name: string } };

    beforeEach(() => {
      logPlugin = makePlugin();
      mockApiV2 = { defaultConfig: { name: 'spc/analytics/log' } };
      mockApiV3 = { defaultConfig: { name: 'appl/analytics/log' } };
    });

    test('should extract nested overrides when AvLogMessagesApiV3 plugin is registered', () => {
      logPlugin.AvLogMessages = mockApiV3;
      mockAvAnalytics = new AvAnalytics([logPlugin], Promise, false, false);

      const elem = document.createElement('button');
      elem.setAttribute('data-analytics-category', 'error');
      elem.setAttribute('data-analytics-overrides-endpoint', '/custom/log');
      elem.setAttribute('data-analytics-overrides-timeout', '5000');

      const attrs = mockAvAnalytics.getAnalyticAttrs(elem);

      expect(attrs).toEqual({
        category: 'error',
        overrides: {
          endpoint: '/custom/log',
          timeout: '5000',
        },
      });
    });

    test('should extract nested overrides when AvLogMessagesApiV2 plugin is registered', () => {
      logPlugin.AvLogMessages = mockApiV2;
      mockAvAnalytics = new AvAnalytics([logPlugin], Promise, false, false);

      const elem = document.createElement('button');
      elem.setAttribute('data-analytics-overrides-retry', 'true');

      const attrs = mockAvAnalytics.getAnalyticAttrs(elem);

      expect(attrs).toEqual({
        overrides: {
          retry: 'true',
        },
      });
    });

    test('should NOT extract nested overrides when no log plugin is registered', () => {
      const googlePlugin = makePlugin();
      mockAvAnalytics = new AvAnalytics([googlePlugin], Promise, false, false);

      const elem = document.createElement('button');
      elem.setAttribute('data-analytics-category', 'button');
      elem.setAttribute('data-analytics-overrides-endpoint', '/custom/log');

      const attrs = mockAvAnalytics.getAnalyticAttrs(elem);

      expect(attrs).toEqual({
        category: 'button',
        overridesEndpoint: '/custom/log',
      });
    });

    test('should NOT extract nested overrides when plugin has no AvLogMessages', () => {
      const plugin = makePlugin();
      mockAvAnalytics = new AvAnalytics([plugin], Promise, false, false);

      const elem = document.createElement('button');
      elem.setAttribute('data-analytics-category', 'button');
      elem.setAttribute('data-analytics-overrides-endpoint', '/custom/log');

      const attrs = mockAvAnalytics.getAnalyticAttrs(elem);

      expect(attrs).toEqual({
        category: 'button',
        overridesEndpoint: '/custom/log',
      });
    });

    test('should handle log plugin without overrides attributes', () => {
      logPlugin.AvLogMessages = mockApiV3;
      mockAvAnalytics = new AvAnalytics([logPlugin], Promise, false, false);

      const elem = document.createElement('button');
      elem.setAttribute('data-analytics-category', 'error');

      const attrs = mockAvAnalytics.getAnalyticAttrs(elem);

      expect(attrs).toEqual({
        category: 'error',
      });
    });

    test('should use custom attributePrefix with log plugin', () => {
      logPlugin.AvLogMessages = mockApiV3;
      mockAvAnalytics = new AvAnalytics([logPlugin], Promise, false, false, {
        attributePrefix: 'custom-attr',
      });

      const elem = document.createElement('button');
      elem.setAttribute('custom-attr-overrides-endpoint', '/test');

      const attrs = mockAvAnalytics.getAnalyticAttrs(elem);

      expect(attrs).toEqual({
        overrides: {
          endpoint: '/test',
        },
      });
    });

    test('should extract nested overrides when multiple plugins including log plugin', () => {
      logPlugin.AvLogMessages = mockApiV3;
      const googlePlugin = makePlugin();
      mockAvAnalytics = new AvAnalytics([googlePlugin, logPlugin], Promise, false, false);

      const elem = document.createElement('button');
      elem.setAttribute('data-analytics-category', 'error');
      elem.setAttribute('data-analytics-overrides-endpoint', '/custom/log');

      const attrs = mockAvAnalytics.getAnalyticAttrs(elem);

      expect(attrs).toEqual({
        category: 'error',
        overrides: {
          endpoint: '/custom/log',
        },
      });
    });
  });
});
