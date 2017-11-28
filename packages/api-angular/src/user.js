import angular from 'angular';

import { AvUsers } from '@availity/api-core';

function AvUsersResourceFactory($http, $q, AvApiOptions) {
  class AvUsersResource extends AvUsers {
    constructor() {
      const theseOptions = angular.copy(AvApiOptions);
      super($http, $q, theseOptions);
    }
  }
  return new AvUsersResource();
}
AvUsersResourceFactory.$inject = ['$http', '$q', 'AvApiOptions'];
export default AvUsersResourceFactory;
