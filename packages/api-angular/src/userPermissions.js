import angular from 'angular';

import { AvUserPermissions } from '@availity/api-core';

export default ($http, $q, avApiOptions) =>
  new AvUserPermissions({
    http: $http,
    promise: $q,
    merge: angular.merge,
    config: angular.copy(avApiOptions),
  });
