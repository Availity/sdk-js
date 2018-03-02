import angular from 'angular';

import { AvFiles } from '@availity/api-core';

export default ($http, $q, avApiOptions) =>
  new AvFiles({
    http: $http,
    promise: $q,
    merge: angular.merge,
    config: angular.copy(avApiOptions),
  });
