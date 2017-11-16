import angular from 'angular';

import AvApiAngular from '@availity/api-angular';

import { AvAuthorizations } from '@availity/authorizations-core';

function AvAuthorizationsFactory(AvPermissionsResource, AvRegionsResource, $q) {
  return new AvAuthorizations(AvPermissionsResource, AvRegionsResource, $q);
}
AvAuthorizationsFactory.$inject = [
  'AvPermissionsResource',
  'AvRegionsResource',
  '$q',
];

export default angular
  .module('availity.authorizations', [AvApiAngular])
  .factory('AvAuthorizations', AvAuthorizationsFactory).name;
