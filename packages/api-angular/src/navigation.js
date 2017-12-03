import angular from 'angular';

import { AvNavigation } from '@availity/api-core';

function factory($http, $q, avApiOptions) {
  class AvNavigationResource extends AvNavigation {
    constructor() {
      const theseOptions = angular.copy(avApiOptions);
      super($http, $q, theseOptions);
    }
  }
  return new AvNavigationResource();
}
export default factory;
