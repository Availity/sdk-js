import angular from 'angular';

import { AvProviders } from '@availity/api-core';

function factory($http, $q, avApiOptions) {
  class AvProvidersApi extends AvProviders {
    constructor() {
      const options = angular.copy(avApiOptions);
      super($http, $q, options);
    }
  }
  return new AvProvidersApi();
}
export default factory;
