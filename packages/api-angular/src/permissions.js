import angular from 'angular';

import { AvPermissions } from '@availity/api-core';

function AvPermissionsResourceFactory($http, $q, AvApiOptions) {
  class AvPermissionsResource extends AvPermissions {
    constructor() {
      const theseOptions = angular.copy(AvApiOptions);
      super($http, $q, theseOptions);
    }
  }
  return new AvPermissionsResource();
}
export default AvPermissionsResourceFactory;
