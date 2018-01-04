import angular from 'angular';

import { AvProviders } from '@availity/api-core';

export default ($http, $q, avApiOptions) =>
  new AvProviders({
    http: $http,
    promise: $q,
    merge: angular.merge,
    config: angular.copy(avApiOptions),
  });
