import angular from 'angular';

import { AvNavigation } from '@availity/api-core';

export default ($http, $q, avApiOptions) =>
  new AvNavigation($http, $q, angular.merge, angular.copy(avApiOptions));
