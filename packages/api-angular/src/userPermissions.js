
import angular from 'angular';

import {AvUserPermissions} from '@availity/api-core';

function AvUserPermissionsResourceFactory($http, $q, AvApiOptions) {
  class AvUserPermissionsResource extends AvUserPermissions {
    constructor() {
      const theseOptions = angular.copy(AvApiOptions);
      super($http, $q, theseOptions);
    }
  }
  return new AvUserPermissionsResource();
}
AvUserPermissionsResourceFactory.$inject = ['$http', '$q', 'AvApiOptions'];
export {AvUserPermissionsResourceFactory};
