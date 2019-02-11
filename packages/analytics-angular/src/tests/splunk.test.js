import angular from 'angular';
import 'angular-mocks';
import AvModule from '..';

describe('AvSplunkAnalytics', () => {
  let AvSplunkAnalytics;

  beforeEach(() => {
    angular.mock.module(AvModule);
    angular.mock.inject(_AvSplunkAnalytics_ => {
      AvSplunkAnalytics = _AvSplunkAnalytics_;
    });
  });

  test('AvSplunkAnalytics should be defined', () => {
    expect(AvSplunkAnalytics).toBeDefined();
  });
});
