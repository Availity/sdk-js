import angular from 'angular';

import { AvProviders } from '@availity/api-core';

export default ($http, $q, avApiOptions) =>
  new AvProviders($http, $q, angular.copy(avApiOptions));
