import angular from 'angular';

import { AvOrganizations } from '@availity/api-core';

export default ($http, $q, avUsersApi, avApiOptions) =>
  new AvOrganizations(
    $http,
    $q,
    angular.merge,
    avUsersApi,
    angular.copy(avApiOptions)
  );
