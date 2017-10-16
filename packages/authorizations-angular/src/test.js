/* global angular, inject, describe, beforeEach, test, expect */

import 'angular';
import 'angular-mocks';
import AvModule from './';


describe('AvAuthorizations', () => {
  // let $q;
  let AvAuthorizations;

  beforeEach(() => {
    angular.mock.module(AvModule);
    inject( (_AvAuthorizations_) => {
      AvAuthorizations = _AvAuthorizations_;
    });
  });

  test('AvAuthorizations should be defined', () => {
    expect(AvAuthorizations).toBeDefined();
  });

});
