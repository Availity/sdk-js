import angular from 'angular';

import { AvProxy } from '@availity/api-core';

function factory($http, $q, avApiOptions) {
  class AvProxyResource extends AvProxy {
    constructor(options) {
      options = angular.merge({}, avApiOptions, options);
      super($http, $q, options);
    }
  }
  return AvProxyResource;
}
export default factory;
