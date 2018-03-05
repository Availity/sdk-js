import angular from 'angular';

import { AvSettings } from '@availity/api-core';

export default ($http, $q, avApiOptions) =>
  new AvSettings({
    http: $http,
    promise: $q,
    merge: angular.merge,
    config: angular.copy(avApiOptions),
  });
