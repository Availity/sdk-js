import angular from 'angular';
import 'angular-mocks';
import avModule from '../';

describe('avAuthorizations', () => {
  let avAuthorizations;

  beforeEach(() => {
    angular.mock.module(avModule);
    angular.mock.inject(_avAuthorizations_ => {
      avAuthorizations = _avAuthorizations_;
    });
  });

  test('AvAuthorizations should be defined', () => {
    expect(avAuthorizations).toBeDefined();
  });
});
