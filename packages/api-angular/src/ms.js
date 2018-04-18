import angular from 'angular';

import { AvMicroservice } from '@availity/api-core';

function factory($http, $q, avApiOptions) {
  class AvMicroserviceApi extends AvMicroservice {
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
  return AvMicroserviceApi;
}

export default factory;
