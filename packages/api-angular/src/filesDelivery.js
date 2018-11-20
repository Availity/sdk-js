import angular from 'angular';

import { AvFilesDelivery } from '@availity/api-core';

export default ($http, $q, avApiOptions) =>
  new AvFilesDelivery({
    http: $http,
    promise: $q,
    merge: angular.merge,
    config: angular.copy(avApiOptions),
  });
