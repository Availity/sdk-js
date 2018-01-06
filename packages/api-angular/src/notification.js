import angular from 'angular';

import { AvNotification } from '@availity/api-core';

export default ($http, $q, avApiOptions) =>
  new AvNotification({
    http: $http,
    promise: $q,
    merge: angular.merge,
    config: angular.copy(avApiOptions),
  });
