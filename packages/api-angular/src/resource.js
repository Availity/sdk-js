import angular from 'angular';

import { AvApi } from '@availity/api-core';

function AvApiResourceFactory($http, $q, AvApiOptions) {
  class AvApiResource extends AvApi {
    constructor(options) {
      if (!options) {
        throw new Error('[options] cannot be null or undefined');
      }
      const theseOptions = angular.merge({}, AvApiOptions, options);
      super($http, $q, theseOptions);
    }
  }
  return AvApiResource;
}

export default AvApiResourceFactory;
