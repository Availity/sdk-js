import angular from 'angular';
import 'angular-mocks';
import avModule from '../';

describe('Api Definitions Angular', () => {
  beforeEach(() => {
    angular.mock.module(avModule);
  });

  describe('AvMicroservice', () => {
    test('should initialize with constructor', () => {
      angular.mock.inject(_AvMicroserviceApi_ => {
        const AvMicroserviceApi = _AvMicroserviceApi_;
        expect(AvMicroserviceApi).toBeDefined();
        expect(() => {
          // eslint-disable-next-line
          new AvMicroserviceApi({ path: '/a/b', name: 'foo' });
        }).not.toThrow();
      });
    });
  });

  test('avFilesApi should be defined', () => {
    let avFilesApi;
    angular.mock.inject(_avFilesApi_ => {
      avFilesApi = _avFilesApi_;
      expect(avFilesApi).toBeDefined();
    });
  });
});
