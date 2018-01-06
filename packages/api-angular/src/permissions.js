import angular from 'angular';

import { AvPermissions } from '@availity/api-core';

export default ($http, $q, avApiOptions) =>
  new AvPermissions({
    http: $http,
    promise: $q,
    merge: angular.merge,
    config: angular.copy(avApiOptions),
  });
