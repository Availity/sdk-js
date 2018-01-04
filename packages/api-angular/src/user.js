import angular from 'angular';

import { AvUsers } from '@availity/api-core';

export default ($http, $q, avApiOptions) =>
  new AvUsers({
    http: $http,
    promise: $q,
    merge: angular.merge,
    config: angular.copy(avApiOptions),
  });
