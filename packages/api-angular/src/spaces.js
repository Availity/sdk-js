import angular from 'angular';

import { AvSpaces } from '@availity/api-core';

function factory($http, $q, avApiOptions) {
  class AvSpacesApi extends AvSpaces {
    constructor() {
      super({
        http: $http,
        promise: $q,
        merge: angular.merge,
        config: angular.copy(avApiOptions),
      });
    }
  }
  return new AvSpacesApi();
}

export default factory;
