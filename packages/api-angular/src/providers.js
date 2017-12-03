import angular from 'angular';

import { AvProviders } from '@availity/api-core';

function factory($http, $q, avApiOptions) {
  class AvProvidersResource extends AvProviders {
    constructor() {
      const options = angular.copy(avApiOptions);
      super($http, $q, options);
    }
  }
  return new AvProvidersResource();
}
export default factory;
