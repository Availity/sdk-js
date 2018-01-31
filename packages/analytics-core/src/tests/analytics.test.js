import { AvAnalytics } from '../';

function makePlugin() {
  return {
    isEnabled: jest.fn(() => true),
    init: jest.fn(),
    trackEvent: jest.fn(),
    trackPageView: jest.fn(),
  };
}

describe('AvAnalytics', () => {
  let mockAvAnalytics;

  test('AvAnalytics should be defined', () => {
    const plugins = [makePlugin()];
    mockAvAnalytics = new AvAnalytics(plugins, Promise, true);
    expect(mockAvAnalytics).toBeDefined();
    mockAvAnalytics = new AvAnalytics(plugins, Promise);
    expect(mockAvAnalytics).toBeDefined();
  });

  test('AvAnalytics should throw error without plugins or Promise', () => {
    const plugins = [makePlugin()];
    expect(() => {
      mockAvAnalytics = new AvAnalytics(plugins);
    }).toThrow('[plugins], and [promise] must be defined');
  });

  test('AvAnalytics should cast plugins to an array', () => {
    const plugin = makePlugin();
    mockAvAnalytics = new AvAnalytics(plugin, Promise);
    expect(mockAvAnalytics.plugins).toEqual([plugin]);
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

    test('isPageTracking will not change without start/stop pageTracking functions defined', () => {
      mockAvAnalytics.setPageTracking(true);
      expect(mockAvAnalytics.isPageTracking).toBe(false);
      mockAvAnalytics.setPageTracking(false);
      expect(mockAvAnalytics.isPageTracking).toBe(false);
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
    let plugins;
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
      plugins.forEach(plugin => {
        expect(plugin.isEnabled).toHaveBeenCalled();
      });
    });

    test('should call init on enabled plugins', () => {
      mockAvAnalytics.init();
      plugins.forEach(plugin => {
        expect(plugin.init).toHaveBeenCalledTimes(1);
      });

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
    let plugins;
    beforeEach(() => {
      plugins = [makePlugin(), makePlugin(), makePlugin()];

      mockAvAnalytics = new AvAnalytics(plugins, Promise);

      plugins[0].isEnabled.mockImplementation(() => false);
      plugins[1].trackEvent = 'test';
      plugins[2].trackPageView = 'test';
    });

    test('trackEvent should call trackEvent on enabled plugins with properties', async () => {
      const mockProperties = 'testProperties';
      await mockAvAnalytics.trackEvent(mockProperties);
      expect(plugins[0].trackEvent).not.toHaveBeenCalled();
      expect(plugins[2].trackEvent).toHaveBeenCalledWith(mockProperties);
    });

    test('trackPageView should call trackPageView on enabled plugins with properties', async () => {
      const mockUrl = 'testProperties';
      await mockAvAnalytics.trackPageView(mockUrl);
      expect(plugins[0].trackPageView).not.toHaveBeenCalled();
      expect(plugins[1].trackPageView).toHaveBeenCalledWith(mockUrl);
    });
  });
});
