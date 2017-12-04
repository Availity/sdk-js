import angular from 'angular';

import { AvUserPermissions } from '@availity/api-core';

function factory($http, $q, avApiOptions) {
  class AvUserPermissionsApi extends AvUserPermissions {
    constructor() {
      const options = angular.copy(avApiOptions);
      super($http, $q, options);
    }
  }
  return new AvUserPermissionsApi();
}

export default factory;
