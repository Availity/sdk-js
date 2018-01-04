import angular from 'angular';

import { AvUsers } from '@availity/api-core';

export default ($http, $q, avApiOptions) =>
  new AvUsers($http, $q, angular.merge, angular.copy(avApiOptions));
