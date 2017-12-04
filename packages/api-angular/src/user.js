import angular from 'angular';

import { AvUsers } from '@availity/api-core';

function factory($http, $q, avApiOptions) {
  class AvUsersApi extends AvUsers {
    constructor() {
      const options = angular.copy(avApiOptions);
      super($http, $q, options);
    }
  }
  return new AvUsersApi();
}

export default factory;
