import angular from 'angular';

import { AvProxy } from '@availity/api-core';

function AvProxyResourceFactory($http, $q, AvApiOptions) {
  class AvProxyResource extends AvProxy {
    constructor(options) {
      const theseOptions = angular.merge({}, AvApiOptions, options);
      super($http, $q, theseOptions);
    }
  }
  return AvProxyResource;
}
AvProxyResourceFactory.$inject = ['$http', '$q', 'AvApiOptions'];
export { AvProxyResourceFactory };
