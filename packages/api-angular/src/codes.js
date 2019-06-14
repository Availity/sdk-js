import angular from 'angular';

import { AvCodes } from '@availity/api-core';

export default ($http, $q, avApiOptions) =>
  new AvCodes({
    http: $http,
    promise: $q,
    merge: angular.merge,
    config: angular.copy(avApiOptions),
  });
