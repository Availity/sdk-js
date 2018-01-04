import angular from 'angular';

import { AvUserPermissions } from '@availity/api-core';

export default ($http, $q, avApiOptions) =>
  new AvUserPermissions($http, $q, angular.merge, angular.copy(avApiOptions));
