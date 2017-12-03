import angular from 'angular';

import { AvUserPermissions } from '@availity/api-core';

function factory($http, $q, avApiOptions) {
  class AvUserPermissionsResource extends AvUserPermissions {
    constructor() {
      const options = angular.copy(avApiOptions);
      super($http, $q, options);
    }
  }
  return new AvUserPermissionsResource();
}

export default factory;
