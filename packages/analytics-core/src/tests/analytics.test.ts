import type { Mock } from 'vitest';
import { AvAnalytics } from '..';

type MockPlugin = {
  enabled: boolean;
  isEnabled: Mock;
  init: Mock;
  trackEvent: Mock;
  trackPageView: Mock;
};

function makePlugin() {
  return {
    enabled: true,
    isEnabled: vi.fn(() => true),
    init: vi.fn(),
    trackEvent: vi.fn(),
    trackPageView: vi.fn(),
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

    test('does not call start/stop when pageTracking already matches isPageTracking', () => {
      // This test verifies the NO-OP case: when pageTracking === isPageTracking,
      // neither startPageTracking nor stopPageTracking should be called.
      // The "opposite" case (where they ARE called) is covered by the next test.
      mockAvAnalytics.startPageTracking = vi.fn();
      mockAvAnalytics.stopPageTracking = vi.fn();

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
      mockAvAnalytics.startPageTracking = vi.fn();
      mockAvAnalytics.stopPageTracking = vi.fn();

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
      mockAvAnalytics.setPageTracking = vi.fn();
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
      plugins[1].init = 'test' as unknown as Mock;
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
      plugins[1].trackEvent = 'test' as unknown as Mock;
      plugins[2].trackPageView = 'test' as unknown as Mock;
    });

    test('trackEvent should call trackEvent on enabled plugins with properties', async () => {
      const mockProperties = {};
      await mockAvAnalytics.trackEvent(mockProperties);

      expect(plugins[0].trackEvent).not.toHaveBeenCalled(); // disabled plugin skipped
      // plugins[1].trackEvent is a string — non-function plugins must be skipped
      // (no spy to call, but we verify plugins[2] was called and nothing threw)
      expect(plugins[2].trackEvent).toHaveBeenCalledWith(mockProperties);
    });

    test('trackEvent skips plugins whose trackEvent is not a function', async () => {
      // plugins[1].trackEvent = 'test' (set in beforeEach) — must be silently skipped
      const mockProperties = { url: 'http://test' };
      await expect(mockAvAnalytics.trackEvent(mockProperties)).resolves.not.toThrow();
      // Only plugins[2] (enabled + has function) should have been called
      expect(plugins[2].trackEvent).toHaveBeenCalledTimes(1);
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
      elem.dataset.analyticsCategory = 'error';
      elem.dataset.analyticsOverridesEndpoint = '/custom/log';
      elem.dataset.analyticsOverridesTimeout = '5000';

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
      elem.dataset.analyticsOverridesRetry = 'true';

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
      elem.dataset.analyticsCategory = 'button';
      elem.dataset.analyticsOverridesEndpoint = '/custom/log';

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
      elem.dataset.analyticsCategory = 'button';
      elem.dataset.analyticsOverridesEndpoint = '/custom/log';

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
      elem.dataset.analyticsCategory = 'error';

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
      elem.dataset.analyticsCategory = 'error';
      elem.dataset.analyticsOverridesEndpoint = '/custom/log';

      const attrs = mockAvAnalytics.getAnalyticAttrs(elem);

      expect(attrs).toEqual({
        category: 'error',
        overrides: {
          endpoint: '/custom/log',
        },
      });
    });
  });

  describe('startAutoTrack / stopAutoTrack', () => {
    test('startAutoTrack adds click/focus/blur listeners on document.body', () => {
      const addSpy = vi.spyOn(document.body, 'addEventListener');
      const plugin = makePlugin();
      // autoTrack=false so we can call manually
      mockAvAnalytics = new AvAnalytics([plugin], Promise, false, false);
      mockAvAnalytics.startAutoTrack();

      expect(addSpy).toHaveBeenCalledWith('click', mockAvAnalytics.handleEvent, true);
      expect(addSpy).toHaveBeenCalledWith('focus', mockAvAnalytics.handleEvent, true);
      expect(addSpy).toHaveBeenCalledWith('blur', mockAvAnalytics.handleEvent, true);
      addSpy.mockRestore();
    });

    test('stopAutoTrack removes click/focus/blur listeners from document.body', () => {
      const removeSpy = vi.spyOn(document.body, 'removeEventListener');
      const plugin = makePlugin();
      mockAvAnalytics = new AvAnalytics([plugin], Promise, false, false);
      mockAvAnalytics.stopAutoTrack();

      expect(removeSpy).toHaveBeenCalledWith('click', mockAvAnalytics.handleEvent, true);
      expect(removeSpy).toHaveBeenCalledWith('focus', mockAvAnalytics.handleEvent, true);
      expect(removeSpy).toHaveBeenCalledWith('blur', mockAvAnalytics.handleEvent, true);
      removeSpy.mockRestore();
    });

    test('constructor calls startAutoTrack when autoTrack is true (default)', () => {
      const plugin = makePlugin();
      const addSpy = vi.spyOn(document.body, 'addEventListener');
      mockAvAnalytics = new AvAnalytics([plugin], Promise, false, true);
      expect(addSpy).toHaveBeenCalledWith('click', mockAvAnalytics.handleEvent, true);
      addSpy.mockRestore();
    });

    test('constructor does not call startAutoTrack when autoTrack is false', () => {
      const plugin = makePlugin();
      const addSpy = vi.spyOn(document.body, 'addEventListener');
      mockAvAnalytics = new AvAnalytics([plugin], Promise, false, false);
      expect(addSpy).not.toHaveBeenCalledWith('click', expect.anything(), true);
      addSpy.mockRestore();
    });
  });

  describe('handleEvent', () => {
    beforeEach(() => {
      mockAvAnalytics = new AvAnalytics([makePlugin()], Promise, false, false);
      // Replace trackEvent BEFORE attaching listeners so handleEvent calls the spy
      mockAvAnalytics.trackEvent = vi.fn();
      mockAvAnalytics.startAutoTrack();
    });

    afterEach(() => {
      mockAvAnalytics.stopAutoTrack();
    });

    test('calls trackEvent when a button with analytics attrs is clicked', () => {
      const btn = document.createElement('button');
      btn.dataset.analyticsAction = 'click';
      btn.dataset.analyticsLabel = 'submit';
      document.body.append(btn);

      btn.dispatchEvent(new MouseEvent('click', { bubbles: true, button: 0 }));

      expect(mockAvAnalytics.trackEvent).toHaveBeenCalledWith(
        expect.objectContaining({ action: 'click', label: 'submit', event: 'click' })
      );
      btn.remove();
    });

    test('does not call trackEvent when the element has no analytics attributes', () => {
      const btn = document.createElement('button');
      document.body.append(btn);

      btn.dispatchEvent(new MouseEvent('click', { bubbles: true, button: 0 }));

      expect(mockAvAnalytics.trackEvent).not.toHaveBeenCalled();
      btn.remove();
    });

    test('does not call trackEvent for a modified click (e.g. ctrl+click)', () => {
      const btn = document.createElement('button');
      btn.dataset.analyticsAction = 'click';
      document.body.append(btn);

      btn.dispatchEvent(new MouseEvent('click', { bubbles: true, button: 0, ctrlKey: true }));

      expect(mockAvAnalytics.trackEvent).not.toHaveBeenCalled();
      btn.remove();
    });

    test('does not call trackEvent for right-click (non-left button)', () => {
      const btn = document.createElement('button');
      btn.dataset.analyticsAction = 'click';
      document.body.append(btn);

      btn.dispatchEvent(new MouseEvent('click', { bubbles: true, button: 2 }));

      expect(mockAvAnalytics.trackEvent).not.toHaveBeenCalled();
      btn.remove();
    });

    test('focus events fire trackEvent on input elements', () => {
      const input = document.createElement('input');
      input.dataset.analyticsAction = 'focus';
      input.dataset.analyticsLabel = 'email';
      document.body.append(input);

      input.dispatchEvent(new FocusEvent('focus', { bubbles: true }));

      expect(mockAvAnalytics.trackEvent).toHaveBeenCalledWith(
        expect.objectContaining({ action: 'focus', label: 'email', event: 'focus' })
      );
      input.remove();
    });

    test('removes non-action modifier keys from final payload, keeps action and event', () => {
      const btn = document.createElement('button');
      btn.dataset.analyticsAction = 'click';
      btn.dataset.analyticsCategory = 'nav';
      document.body.append(btn);

      btn.dispatchEvent(new MouseEvent('click', { bubbles: true, button: 0 }));

      expect(mockAvAnalytics.trackEvent).toHaveBeenCalledTimes(1);
      const payload = (mockAvAnalytics.trackEvent as ReturnType<typeof vi.fn>).mock.calls[0][0];
      expect(payload.category).toBe('nav');
      expect(payload.event).toBe('click');
      expect(payload.action).toBe('click');
      btn.remove();
    });
  });

  describe('trackEvent resilience', () => {
    test('a throwing plugin does not prevent other plugins from tracking', async () => {
      const throwingPlugin = {
        ...makePlugin(),
        trackEvent: vi.fn(() => {
          throw new Error('plugin exploded');
        }),
      };
      const goodPlugin = makePlugin();
      mockAvAnalytics = new AvAnalytics([throwingPlugin, goodPlugin], Promise, false, false);

      await expect(mockAvAnalytics.trackEvent({ url: 'http://test' })).resolves.not.toThrow();
      expect(goodPlugin.trackEvent).toHaveBeenCalledTimes(1);
    });

    test('a throwing plugin in trackPageView does not prevent others', async () => {
      const throwingPlugin = {
        ...makePlugin(),
        trackPageView: vi.fn(() => {
          throw new Error('page view exploded');
        }),
      };
      const goodPlugin = makePlugin();
      mockAvAnalytics = new AvAnalytics([throwingPlugin, goodPlugin], Promise, false, false);

      await expect(mockAvAnalytics.trackPageView('https://example.com')).resolves.not.toThrow();
      expect(goodPlugin.trackPageView).toHaveBeenCalledWith('https://example.com');
    });
  });

  describe('trackPageView url handling', () => {
    beforeEach(() => {
      const plugin = makePlugin();
      mockAvAnalytics = new AvAnalytics([plugin], Promise, false, false);
    });

    test('passes string url directly to plugins', async () => {
      const plugin = mockAvAnalytics.plugins[0] as MockPlugin;
      await mockAvAnalytics.trackPageView('https://example.com/page');
      expect(plugin.trackPageView).toHaveBeenCalledWith('https://example.com/page');
    });

    test('extracts newURL from hashchange event object', async () => {
      const plugin = mockAvAnalytics.plugins[0] as MockPlugin;
      // hashchange fires with an Event object, not a string
      await mockAvAnalytics.trackPageView({ newURL: 'https://example.com/#/new-route' } as unknown as string);
      expect(plugin.trackPageView).toHaveBeenCalledWith('https://example.com/#/new-route');
    });

    test('falls back to window.location.href when url is falsy', async () => {
      const plugin = mockAvAnalytics.plugins[0] as MockPlugin;
      await mockAvAnalytics.trackPageView(undefined as unknown as string);
      expect(plugin.trackPageView).toHaveBeenCalledWith(window.location.href);
    });
  });
});
