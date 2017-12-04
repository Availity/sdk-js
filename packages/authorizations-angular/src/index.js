import angular from 'angular';

import AvApiAngular from '@availity/api-angular';

import AvAuthorizations from '@availity/authorizations-core';

function factory(avPermissionsApi, avRegionsApi, $q) {
  return new AvAuthorizations(avPermissionsApi, avRegionsApi, $q);
}

export default angular
  .module('availity.authorizations', [AvApiAngular])
  .factory('avAuthorizations', factory).name;
