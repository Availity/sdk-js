import angular from 'angular';

import { AvPermissions } from '@availity/api-core';

function factory($http, $q, avApiOptions) {
  class AvPermissionsApi extends AvPermissions {
    constructor() {
      const options = angular.copy(avApiOptions);
      super($http, $q, options);
    }
  }
  return new AvPermissionsApi();
}
export default factory;
