import angular from 'angular';
import 'angular-mocks';
import AvModule from '../';

describe('AvAnalyticsProvider', () => {
  let provider;

  beforeEach(() => {
    angular.mock.module(AvModule, AvAnalyticsProvider => {
      provider = AvAnalyticsProvider;
    });
  });

  test('AvAnalyticsProvider should be defined', () => {
    angular.mock.inject(() => {
      expect(provider).toBeDefined();
    });
  });

  test('registerPlugins should set plugins array', () => {
    angular.mock.inject(() => {
      let input = 'test';
      let expected = ['test'];
      expect(provider.plugins).toEqual(['AvSplunkAnalytics']);
      provider.registerPlugins(input);
      expect(provider.plugins).toEqual(expected);
      input = ['hello', 'world'];
      expected = input;
      provider.registerPlugins(input);
      expect(provider.plugins).toEqual(expected);
    });
  });

  test('registerPlugins should throw error when input is not string or array', () => {
    angular.mock.inject(() => {
      expect(() => {
        provider.registerPlugins({ value: 'test' });
      }).toThrow(
        'AvAnalyticsProvider.registerPlugins() expects a string or an array.'
      );
    });
  });

  test('setVirtualPageTracking should set value when arguments given', () => {
    angular.mock.inject(() => {
      const defaultValue = provider.virtualPageTracking;
      provider.setVirtualPageTracking();
      expect(provider.virtualPageTracking).toBe(defaultValue);
      let test = false;
      let expected = false;
      provider.setVirtualPageTracking(test);
      expect(provider.virtualPageTracking).toBe(expected);

      test = 'test';
      expected = true;
      provider.setVirtualPageTracking(test);
      expect(provider.virtualPageTracking).toBe(expected);

      test = '';
      expected = false;
      provider.setVirtualPageTracking(test);
      expect(provider.virtualPageTracking).toBe(expected);
    });
  });

  test('AvAnalytics should inject services from strings', () => {
    inject(($log, $injector, $q, $rootScope, AvSplunkAnalytics) => {
      const AvAnalytics = provider.$get($log, $injector, $q, $rootScope);
      expect(AvAnalytics.plugins).toEqual([AvSplunkAnalytics]);
    });
  });

  test('AvAnalytics startPageTracking should listen on rootScope', () => {
    inject(($log, $injector, $q, $rootScope) => {
      $rootScope.$on = jest.fn();
      const AvAnalytics = provider.$get($log, $injector, $q, $rootScope);
      AvAnalytics.startPageTracking();
      expect($rootScope.$on.mock.calls[0][0]).toBe('$locationChangeSuccess');
    });

    test('AvAnalytics stopPageTracking should call deregistration function and delete it', () => {
      inject(($log, $injector, $q, $rootScope) => {
        const mockPageListener = jest.fn();
        const AvAnalytics = provider.$get($log, $injector, $q, $rootScope);
        AvAnalytics.pageListener = mockPageListener;
        AvAnalytics.stopPageTracking();
        expect(mockPageListener).toHaveBeenCalled();
        expect(AvAnalytics.pageListener).toBeUndefined();
      });
    });
  });
});
