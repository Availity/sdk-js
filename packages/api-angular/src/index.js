import angular from 'angular';

import avApiOptionsProvider from './options';
import avApiResourceFactory from './resource';

import avLogMessagesResourceFactory from './logs';
import avNavigationResourceFactory from './navigation';
import avOrganizationsResourceFactory from './organizations';
import avPermissionsResourceFactory from './permissions';
import avProvidersResourceFactory from './providers';
import avProxyResourceFactory from './proxy';
import avRegionsResourceFactory from './regions';
import avSpacesResourceFactory from './spaces';
import avUsersResourceFactory from './user';
import avUserPermissionsResourceFactory from './userPermissions';

export default angular
  .module('availity.api', ['ng'])
  .provider('avApiOptions', avApiOptionsProvider)
  .factory('AvApiResource', avApiResourceFactory)
  .factory('avLogMessagesResource', avLogMessagesResourceFactory)
  .factory('avNavigationResource', avNavigationResourceFactory)
  .factory('avOrganizationsResource', avOrganizationsResourceFactory)
  .factory('avPermissionsResource', avPermissionsResourceFactory)
  .factory('avProvidersResource', avProvidersResourceFactory)
  .factory('AvProxyResource', avProxyResourceFactory)
  .factory('avRegionsResource', avRegionsResourceFactory)
  .factory('avSpacesResource', avSpacesResourceFactory)
  .factory('avUsersResource', avUsersResourceFactory)
  .factory('avUserPermissionsResource', avUserPermissionsResourceFactory).name;
