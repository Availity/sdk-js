import angular from 'angular';

import { AvProviders } from '@availity/api-core';

function AvProvidersResourceFactory($http, $q, AvApiOptions) {
  class AvProvidersResource extends AvProviders {
    constructor() {
      const theseOptions = angular.copy(AvApiOptions);
      super($http, $q, theseOptions);
    }
  }
  return new AvProvidersResource();
}
AvProvidersResourceFactory.$inject = ['$http', '$q', 'AvApiOptions'];
export default { AvProvidersResourceFactory };
