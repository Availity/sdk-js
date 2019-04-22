import angular from 'angular';
import 'angular-mocks';
import AvModule from '..';

describe('AvDmaAnalytics', () => {
  let AvDmaAnalytics;

  beforeEach(() => {
    angular.mock.module(AvModule);
    angular.mock.inject(_AvDmaAnalytics_ => {
      AvDmaAnalytics = _AvDmaAnalytics_;
    });
  });

  test('AvDmaAnalytics should be defined', () => {
    expect(AvDmaAnalytics).toBeDefined();
  });
});
