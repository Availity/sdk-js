import angular from 'angular';

import { AvPdf } from '@availity/api-core';

export default ($http, $q, avApiOptions) =>
  new AvPdf({
    http: $http,
    promise: $q,
    merge: angular.merge,
    config: angular.copy(avApiOptions),
  });
