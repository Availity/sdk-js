import angular from 'angular';

import { AvSpaces } from '@availity/api-core';

export default ($http, $q, avApiOptions) =>
  new AvSpaces({
    http: $http,
    promise: $q,
    merge: angular.merge,
    config: angular.copy(avApiOptions),
  });
