import angular from 'angular';

import { AvPermissions } from '@availity/api-core';

function factory($http, $q, avApiOptions) {
  class AvPermissionsResource extends AvPermissions {
    constructor() {
      const theseOptions = angular.copy(avApiOptions);
      super($http, $q, theseOptions);
    }
  }
  return new AvPermissionsResource();
}
export default factory;
