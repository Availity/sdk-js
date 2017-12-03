import angular from 'angular';

import { AvSpaces } from '@availity/api-core';

function factory($http, $q, avApiOptions) {
  class AvSpacesResource extends AvSpaces {
    constructor() {
      const options = angular.copy(avApiOptions);
      super($http, $q, options);
    }
  }
  return new AvSpacesResource();
}

export default factory;
