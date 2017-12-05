import angular from 'angular';
import { AvLogMessages } from '@availity/api-core';

export default ($http, $q, avApiOptions) =>
  new AvLogMessages($http, $q, angular.copy(avApiOptions));
