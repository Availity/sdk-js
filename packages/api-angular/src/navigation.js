import angular from 'angular';

import { AvNavigation } from '@availity/api-core';

function factory($http, $q, avApiOptions) {
  class AvNavigationApi extends AvNavigation {
    constructor() {
      const options = angular.copy(avApiOptions);
      super($http, $q, options);
    }
  }
  return new AvNavigationApi();
}
export default factory;
