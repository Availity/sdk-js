import angular from 'angular';

import { AvProxy } from '@availity/api-core';

function factory($http, $q, avApiOptions) {
  class AvProxyApi extends AvProxy {
    constructor(options) {
      options = angular.merge({}, avApiOptions, options);
      super({
        http: $http,
        promise: $q,
        merge: angular.merge,
        config: options,
      });
    }
  }
  return AvProxyApi;
}
export default factory;
