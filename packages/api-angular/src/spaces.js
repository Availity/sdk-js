import angular from 'angular';

import { AvSpaces } from '@availity/api-core';

function factory($http, $q, avApiOptions) {
  class AvSpacesApi extends AvSpaces {
    constructor() {
      const options = angular.copy(avApiOptions);
      super($http, $q, options);
    }
  }
  return new AvSpacesApi();
}

export default factory;
