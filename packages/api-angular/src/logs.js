import angular from 'angular';
import { AvLogMessages } from '@availity/api-core';

export default ($http, $q, avApiOptions) =>
  new AvLogMessages({
    http: $http,
    promise: $q,
    merge: angular.merge,
    config: angular.copy(avApiOptions),
  });
