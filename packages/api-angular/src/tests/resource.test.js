/* global angular, inject, describe, beforeEach, afterEach, test, expect */

import 'angular';
import 'angular-mocks';
import AvApiModule from '../';

describe('AvApiResource', () => {
  let $httpBackend;
  // let $q;
  let AvApiResource;
  let TestAvApi;

  beforeEach(() => {
    angular.mock.module(AvApiModule);
    inject( (_$httpBackend_, _AvApiResource_) => {
      $httpBackend = _$httpBackend_;
      AvApiResource = _AvApiResource_;
    });
  });

  afterEach( () => {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  test('AvApiResource should be defined', () => {
    TestAvApi = new AvApiResource({});
    expect(TestAvApi).toBeDefined();
  });

  test('AvApiResource should throw errors when missing paramaters', () => {
    expect(() => {
      TestAvApi = new AvApiResource();
    }).toThrowError('[options] cannot be null or undefined');
  });

  describe('With $http', () => {
    let cats;

    const testResponse = {
      testData: 'test'
    };

    beforeEach(function() {
      cats = new AvApiResource({name: 'cats', sessionBust: false});
    });

    test('create() should call $http POST', (done) => {
      // expectGET to make sure this is called once.
      $httpBackend.expectPOST('/api/v1/cats').respond(200, testResponse);
      cats.create({})
      .then((data) => {
        expect(data).toEqual(expect.objectContaining({ data: testResponse }));
        done();
      });
      $httpBackend.flush();
    });

    test('postGet() should call $http POST', (done) => {
      // expectGET to make sure this is called once.
      $httpBackend.expectPOST('/api/v1/cats').respond(200, testResponse);
      cats.postGet({}, {})
      .then((data) => {
        expect(data).toEqual(expect.objectContaining({ data: testResponse }));
        done();
      });
      $httpBackend.flush();
    });

    test('query() should call $http GET', (done) => {
      // expectGET to make sure this is called once.
      $httpBackend.expectGET('/api/v1/cats').respond(200, testResponse);
      cats.query()
      .then((data) => {
        expect(data).toEqual(expect.objectContaining({ data: testResponse }));
        done();
      });
      $httpBackend.flush();
    });

    test('get() should call $http GET', (done) => {
      // expectGET to make sure this is called once.
      $httpBackend.expectGET('/api/v1/cats/1').respond(200, testResponse);
      cats.get(1)
      .then((data) => {
        expect(data).toEqual(expect.objectContaining({ data: testResponse }));
        done();
      });
      $httpBackend.flush();
    });

    test('update() should call $http PUT', (done) => {
      // expectGET to make sure this is called once.
      $httpBackend.expectPUT('/api/v1/cats/1').respond(200, testResponse);
      cats.update(1, {})
      .then((data) => {
        expect(data).toEqual(expect.objectContaining({ data: testResponse }));
        done();
      });
      $httpBackend.flush();
    });

    test('remove() should call $http DELETE', (done) => {
      // expectGET to make sure this is called once.
      $httpBackend.expectDELETE('/api/v1/cats').respond(200, testResponse);
      cats.remove({}, {})
      .then((data) => {
        expect(data).toEqual(expect.objectContaining({ data: testResponse }));
        done();
      });
      $httpBackend.flush();
    });

  });
});
