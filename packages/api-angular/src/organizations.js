import angular from 'angular';

import { AvOrganizations } from '@availity/api-core';

function factory($http, $q, avUsersApi, avApiOptions) {
  class AvOrganizationsApi extends AvOrganizations {
    constructor() {
      const theseOptions = angular.copy(avApiOptions);
      super($http, $q, avUsersApi, theseOptions);
    }
  }
  return new AvOrganizationsApi();
}
export default factory;
