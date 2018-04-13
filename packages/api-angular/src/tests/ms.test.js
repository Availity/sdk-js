import angular from 'angular';
import 'angular-mocks';
import avModule from '../';

describe('MicroserviceApi Definitions Angular', () => {
  beforeEach(() => {
    angular.mock.module(avModule);
  });

  describe('AvMicroservice', () => {
    test('should initialize AvMicroserviceApi', () => {
      angular.mock.inject(_AvMicroserviceApi_ => {
        const AvMicroserviceApi = _AvMicroserviceApi_;
        expect(AvMicroserviceApi).toBeDefined();
        expect(() => {
          // eslint-disable-next-line
          new AvMicroserviceApi({ path: '/a/b', name: 'foo' });
        }).not.toThrow();

        const testMsApi = new AvMicroserviceApi({ path: '/a/b', name: 'foo' });
        expect(testMsApi.defaultConfig.pollingMethod).toEqual('POST');
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
