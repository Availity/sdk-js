import angular from 'angular';

import { AvSpaces } from '@availity/api-core';

function AvSpacesResourceFactory($http, $q, AvApiOptions) {
  class AvSpacesResource extends AvSpaces {
    constructor() {
      const theseOptions = angular.copy(AvApiOptions);
      super($http, $q, theseOptions);
    }
  }
  return new AvSpacesResource();
}

export default AvSpacesResourceFactory;
