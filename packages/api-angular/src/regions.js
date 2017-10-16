
import angular from 'angular';

import {AvRegions} from '@availity/api-core';

function AvRegionsResourceFactory($http, $q, AvUsersResource, AvApiOptions) {
  class AvRegionsResource extends AvRegions {
    constructor() {
      const theseOptions = angular.copy(AvApiOptions);
      super($http, $q, AvUsersResource, theseOptions);
    }
  }
  return new AvRegionsResource();
}
AvRegionsResourceFactory.$inject = ['$http', '$q', 'AvUsersResource', 'AvApiOptions'];
export {AvRegionsResourceFactory};
