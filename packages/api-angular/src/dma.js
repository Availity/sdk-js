import angular from 'angular';

import { AvLogMessagesV2 } from '@availity/api-core';

export default ($http, $q, avApiOptions) =>
  new AvLogMessagesV2({
    http: $http,
    promise: $q,
    merge: angular.merge,
    config: angular.copy(avApiOptions),
  });
