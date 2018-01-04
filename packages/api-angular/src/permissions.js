import angular from 'angular';

import { AvPermissions } from '@availity/api-core';

export default ($http, $q, avApiOptions) =>
  new AvPermissions($http, $q, angular.merge, angular.copy(avApiOptions));
