import angular from 'angular';
import 'angular-mocks';
import AvModule from '../';

describe('AvAuthorizations', () => {
  let AvAuthorizations;

  beforeEach(() => {
    angular.mock.module(AvModule);
    angular.mock(_AvAuthorizations_ => {
      AvAuthorizations = _AvAuthorizations_;
    });
  });

  test('AvAuthorizations should be defined', () => {
    expect(AvAuthorizations).toBeDefined();
  });
});
