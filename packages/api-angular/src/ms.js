import angular from 'angular';

import Api from '@availity/api-core';

function factory($http, $q, avApiOptions) {
  class AvMicroservice extends Api {
    constructor(options) {
      if (!options) {
        throw new Error('[options] cannot be null or undefined');
      }
      options = angular.merge({}, avApiOptions, options);

      super({
        http: $http,
        promise: $q,
        config: options,
      });
    }
  }
  return AvMicroservice;
}

export default factory;
