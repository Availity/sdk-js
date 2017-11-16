/* global angular, inject, describe, beforeEach, test, expect */

import 'angular';
import 'angular-mocks';
import AvModule from '../';

describe('AvSplunkAnalytics', () => {
  // let $q;
  let AvSplunkAnalytics;

  beforeEach(() => {
    angular.mock.module(AvModule);
    inject(_AvSplunkAnalytics_ => {
      AvSplunkAnalytics = _AvSplunkAnalytics_;
    });
  });

  test('AvSplunkAnalytics should be defined', () => {
    expect(AvSplunkAnalytics).toBeDefined();
  });
});
