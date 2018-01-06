import angular from 'angular';

import { AvRegions } from '@availity/api-core';

export default ($http, $q, avUsersApi, avApiOptions) =>
  new AvRegions({
    http: $http,
    promise: $q,
    merge: angular.merge,
    avUsers: avUsersApi,
    config: angular.copy(avApiOptions),
  });
