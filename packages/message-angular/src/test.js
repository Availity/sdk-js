/* global angular, inject, describe, beforeEach, test, expect */

import 'angular';
import 'angular-mocks';
import AvModule from './';


describe('AvMessage Angular', () => {
  // let $q;
  let AvMessage;

  beforeEach(() => {
    angular.mock.module(AvModule);
    inject( (_AvMessage_) => {
      AvMessage = _AvMessage_;
    });
  });

  test('AvMessage should be defined', () => {
    expect(AvMessage).toBeDefined();
  });

});
