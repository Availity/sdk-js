import angular from 'angular';

import { AvOrganizations } from '@availity/api-core';

export default ($http, $q, avUsersApi, avApiOptions) =>
  new AvOrganizations($http, $q, avUsersApi, angular.copy(avApiOptions));
