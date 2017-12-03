import angular from 'angular';

import AvApiAngular from '@availity/api-angular';

import AvAuthorizations from '@availity/authorizations-core';

function factory(avPermissionsResource, avRegionsResource, $q) {
  return new AvAuthorizations(avPermissionsResource, avRegionsResource, $q);
}

export default angular
  .module('availity.authorizations', [AvApiAngular])
  .factory('avAuthorizations', factory).name;
