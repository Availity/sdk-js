/* global angular, inject, describe, beforeEach, test, expect */

import 'angular';
import 'angular-mocks';
import AvModule from '../';


describe('AvAnalyticsPlugin', () => {
  // let $q;
  let AvAnalyticsPlugin;

  beforeEach(() => {
    angular.mock.module(AvModule);
    inject( (_AvAnalyticsPlugin_) => {
      AvAnalyticsPlugin = _AvAnalyticsPlugin_;
    });
  });

  test('AvAnalyticsPlugin should be defined', () => {
    expect(AvAnalyticsPlugin).toBeDefined();
  });

});
