import angular from 'angular';

import { AvRegions } from '@availity/api-core';

export default ($http, $q, avUsersApi, avApiOptions) =>
  new AvRegions($http, $q, avUsersApi, angular.copy(avApiOptions));
