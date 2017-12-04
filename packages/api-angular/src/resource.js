import angular from 'angular';

import AvApi from '@availity/api-core';

function factory($http, $q, avApiOptions) {
  class AvApiResource extends AvApi {
    constructor(options) {
      if (!options) {
        throw new Error('[options] cannot be null or undefined');
      }
      options = angular.merge({}, avApiOptions, options);
      super($http, $q, options);
    }
  }
  return AvApiResource;
}

export default factory;
