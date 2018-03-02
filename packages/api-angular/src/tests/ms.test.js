import angular from 'angular';
import 'angular-mocks';
import avModule from '../';

describe('Api Definitions Angular', () => {
  beforeEach(() => {
    angular.mock.module(avModule);
  });

  test('avFilesApi should be defined', () => {
    let avFilesApi;
    angular.mock.inject(_avFilesApi_ => {
      avFilesApi = _avFilesApi_;
    });
    expect(avFilesApi).toBeDefined();
  });
});
