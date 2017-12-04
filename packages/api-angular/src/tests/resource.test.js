import angular from 'angular';

import 'angular-mocks';
import avApiModule from '../';

describe('AvApi', () => {
  let $httpBackend;
  let AvApi;
  let api;

  beforeEach(() => {
    angular.mock.module(avApiModule);
    angular.mock.inject((_$httpBackend_, _AvApi_) => {
      $httpBackend = _$httpBackend_;
      AvApi = _AvApi_;
    });
  });

  afterEach(() => {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  test('should be defined', () => {
    api = new AvApi({});
    expect(api).toBeDefined();
  });

  test('should throw errors when missing paramaters', () => {
    expect(() => {
      api = new AvApi();
    }).toThrowError('[options] cannot be null or undefined');
  });

  describe('With $http', () => {
    let cats;

    const testResponse = {
      testData: 'test',
    };

    beforeEach(() => {
      cats = new AvApi({ name: 'cats', sessionBust: false });
    });

    test('create() should call $http POST', done => {
      $httpBackend.expectPOST('/api/v1/cats').respond(200, testResponse);
      cats.create({}).then(data => {
        expect(data).toEqual(expect.objectContaining({ data: testResponse }));
        done();
      });
      $httpBackend.flush();
    });

    test('postGet() should call $http POST', done => {
      // expectGET to make sure this is called once.
      $httpBackend.expectPOST('/api/v1/cats').respond(200, testResponse);
      cats.postGet({}, {}).then(data => {
        expect(data).toEqual(expect.objectContaining({ data: testResponse }));
        done();
      });
      $httpBackend.flush();
    });

    test('query() should call $http GET', done => {
      // expectGET to make sure this is called once.
      $httpBackend.expectGET('/api/v1/cats').respond(200, testResponse);
      cats.query().then(data => {
        expect(data).toEqual(expect.objectContaining({ data: testResponse }));
        done();
      });
      $httpBackend.flush();
    });

    test('get() should call $http GET', done => {
      // expectGET to make sure this is called once.
      $httpBackend.expectGET('/api/v1/cats/1').respond(200, testResponse);
      cats.get(1).then(data => {
        expect(data).toEqual(expect.objectContaining({ data: testResponse }));
        done();
      });
      $httpBackend.flush();
    });

    test('update() should call $http PUT', done => {
      // expectGET to make sure this is called once.
      $httpBackend.expectPUT('/api/v1/cats/1').respond(200, testResponse);
      cats.update(1, {}).then(data => {
        expect(data).toEqual(expect.objectContaining({ data: testResponse }));
        done();
      });
      $httpBackend.flush();
    });

    test('remove() should call $http DELETE', done => {
      // expectGET to make sure this is called once.
      $httpBackend.expectDELETE('/api/v1/cats').respond(200, testResponse);
      cats.remove({}, {}).then(data => {
        expect(data).toEqual(expect.objectContaining({ data: testResponse }));
        done();
      });
      $httpBackend.flush();
    });
  });
});
