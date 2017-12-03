import angular from 'angular';

import { AvRegions } from '@availity/api-core';

function factory($http, $q, avUsersResource, avApiOptions) {
  class AvRegionsResource extends AvRegions {
    constructor() {
      const options = angular.copy(avApiOptions);
      super($http, $q, avUsersResource, options);
    }
  }
  return new AvRegionsResource();
}

export default factory;
