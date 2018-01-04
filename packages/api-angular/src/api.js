import angular from 'angular';

import Api from '@availity/api-core';

function factory($http, $q, avApiOptions) {
  class AvApi extends Api {
    constructor(options) {
      if (!options) {
        throw new Error('[options] cannot be null or undefined');
      }
      options = angular.merge({}, avApiOptions, options);

      super({
        http: $http,
        promise: $q,
        merge: angular.merge,
        config: options,
      });
    }
  }
  return AvApi;
}

export default factory;
