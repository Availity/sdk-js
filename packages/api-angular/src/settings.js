import angular from 'angular';

import { AvSettings } from '@availity/api-core';

export default ($http, $q, avUsersApi, avApiOptions) =>
  new AvSettings({
    http: $http,
    promise: $q,
    merge: angular.merge,
    avUsers: avUsersApi,
    config: angular.copy(avApiOptions),
  });
