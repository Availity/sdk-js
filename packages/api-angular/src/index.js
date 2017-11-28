import angular from 'angular';

import AvApiOptionsProvider from './options';
import AvApiResourceFactory from './resource';

import AvLogMessagesResourceFactory from './logs';
import AvNavigationResourceFactory from './navigation';
import AvOrganizationsResourceFactory from './organizations';
import AvPermissionsResourceFactory from './permissions';
import AvProvidersResourceFactory from './providers';
import AvProxyResourceFactory from './proxy';
import AvRegionsResourceFactory from './regions';
import AvSpacesResourceFactory from './spaces';
import AvUsersResourceFactory from './user';
import AvUserPermissionsResourceFactory from './userPermissions';

export default angular
  .module('availity.api', ['ng'])
  .provider('AvApiOptions', AvApiOptionsProvider)
  .factory('AvApiResource', AvApiResourceFactory)
  .factory('AvLogMessagesResource', AvLogMessagesResourceFactory)
  .factory('AvNavigationResource', AvNavigationResourceFactory)
  .factory('AvOrganizationsResource', AvOrganizationsResourceFactory)
  .factory('AvPermissionsResource', AvPermissionsResourceFactory)
  .factory('AvProvidersResource', AvProvidersResourceFactory)
  .factory('AvProxyResource', AvProxyResourceFactory)
  .factory('AvRegionsResource', AvRegionsResourceFactory)
  .factory('AvSpacesResource', AvSpacesResourceFactory)
  .factory('AvUsersResource', AvUsersResourceFactory)
  .factory('AvUserPermissionsResource', AvUserPermissionsResourceFactory).name;
