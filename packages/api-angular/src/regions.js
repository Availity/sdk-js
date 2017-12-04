import angular from 'angular';

import { AvRegions } from '@availity/api-core';

function factory($http, $q, avUsersApi, avApiOptions) {
  class AvRegionsApi extends AvRegions {
    constructor() {
      const options = angular.copy(avApiOptions);
      super($http, $q, avUsersApi, options);
    }
  }
  return new AvRegionsApi();
}

export default factory;
