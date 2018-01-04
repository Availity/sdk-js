import angular from 'angular';

import { AvOrganizations } from '@availity/api-core';

export default ($http, $q, avUsersApi, avApiOptions) =>
  new AvOrganizations({
    http: $http,
    promise: $q,
    merge: angular.merge,
    AvUsers: avUsersApi,
    config: angular.copy(avApiOptions),
  });
