import angular from 'angular';

import { AvUsers } from '@availity/api-core';

function factory($http, $q, avApiOptions) {
  class AvUsersResource extends AvUsers {
    constructor() {
      const theseOptions = angular.copy(avApiOptions);
      super($http, $q, theseOptions);
    }
  }
  return new AvUsersResource();
}

export default factory;
