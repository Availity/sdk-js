import angular from 'angular';

import { AvNavigation } from '@availity/api-core';

export default ($http, $q, avApiOptions) =>
  new AvNavigation({
    http: $http,
    promise: $q,
    merge: angular.merge,
    config: angular.copy(avApiOptions),
  });
