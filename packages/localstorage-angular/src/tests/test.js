import angular from 'angular';
import 'angular-mocks';
import AvModule from '../';

describe('AvLocalStorage', () => {
  // let $q;
  let AvLocalStorage;

  beforeEach(() => {
    angular.mock.module(AvModule);
    angular.inject(_AvLocalStorage_ => {
      AvLocalStorage = _AvLocalStorage_;
    });
  });

  test('AvLocalStorage should be defined', () => {
    expect(AvLocalStorage).toBeDefined();
  });
});
