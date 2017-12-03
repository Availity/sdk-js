import angular from 'angular';

import { AvOrganizations } from '@availity/api-core';

function factory($http, $q, avUsersResource, avApiOptions) {
  class AvOrganizationsResource extends AvOrganizations {
    constructor() {
      const theseOptions = angular.copy(avApiOptions);
      super($http, $q, avUsersResource, theseOptions);
    }
  }
  return new AvOrganizationsResource();
}
export default factory;
