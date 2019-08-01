import angular from 'angular';

import { AvWebQL } from '@availity/api-core';

export default ($http, $q, avApiOptions) =>
  new AvWebQL({
    http: $http,
    promise: $q,
    merge: angular.merge,
    config: angular.copy(avApiOptions),
  });
