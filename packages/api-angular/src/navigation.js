import angular from 'angular';

import { AvNavigation } from '@availity/api-core';

function AvNavigationResourceFactory($http, $q, AvApiOptions) {
  class AvNavigationResource extends AvNavigation {
    constructor() {
      const theseOptions = angular.copy(AvApiOptions);
      super($http, $q, theseOptions);
    }
  }
  return new AvNavigationResource();
}
AvNavigationResourceFactory.$inject = ['$http', '$q', 'AvApiOptions'];
export default AvNavigationResourceFactory;
