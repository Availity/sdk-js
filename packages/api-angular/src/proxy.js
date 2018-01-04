import angular from 'angular';

import { AvProxy } from '@availity/api-core';

function factory($http, $q, avApiOptions) {
  class AvProxyApi extends AvProxy {
    constructor(options) {
      options = angular.merge({}, avApiOptions, options);
      super($http, $q, angular.merge, options);
    }
  }
  return AvProxyApi;
}
export default factory;
