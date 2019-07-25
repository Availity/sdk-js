import angular from 'angular';

import { AvThanos } from '@availity/api-core';

export default ($http, $q, avApiOptions) =>
  new AvThanos({
    http: $http,
    promise: $q,
    merge: angular.merge,
    config: angular.copy(avApiOptions),
  });
