import angular from 'angular';

import { AvOrganizations } from '@availity/api-core';

function AvOrganizationsResourceFactory(
  $http,
  $q,
  AvUsersResource,
  AvApiOptions
) {
  class AvOrganizationsResource extends AvOrganizations {
    constructor() {
      const theseOptions = angular.copy(AvApiOptions);
      super($http, $q, AvUsersResource, theseOptions);
    }
  }
  return new AvOrganizationsResource();
}
AvOrganizationsResourceFactory.$inject = [
  '$http',
  '$q',
  'AvUsersResource',
  'AvApiOptions',
];
export default AvOrganizationsResourceFactory;
