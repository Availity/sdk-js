import angular from 'angular';

import avApiOptionsProvider from './options';
import avApiFactory from './api';
import avMicroserviceApiFactory from './ms';

import avLogMessagesApiFactory from './logs';
import avNavigationApiFactory from './navigation';
import avNotificationApiFactory from './notification';
import avOrganizationsApiFactory from './organizations';
import avPermissionsApiFactory from './permissions';
import avProvidersApiFactory from './providers';
import avProxyApiFactory from './proxy';
import avRegionsApiFactory from './regions';
import avPdfApiFactory from './pdfs';
import avSpacesApiFactory from './spaces';
import avUsersApiFactory from './user';
import avUserPermissionsApiFactory from './userPermissions';
import avFilesApiFactory from './files';
import avSettingsApiFactory from './settings';

export default angular
  .module('availity.api', ['ng'])
  .provider('avApiOptions', avApiOptionsProvider)
  .factory('AvApi', avApiFactory)
  .factory('AvMicroserviceApi', avMicroserviceApiFactory)
  .factory('avLogMessagesApi', avLogMessagesApiFactory)
  .factory('avPdfApi', avPdfApiFactory)
  .factory('avNavigationApi', avNavigationApiFactory)
  .factory('avNotificationsApi', avNotificationApiFactory)
  .factory('avOrganizationsApi', avOrganizationsApiFactory)
  .factory('avPermissionsApi', avPermissionsApiFactory)
  .factory('avProvidersApi', avProvidersApiFactory)
  .factory('AvProxyApi', avProxyApiFactory)
  .factory('avRegionsApi', avRegionsApiFactory)
  .factory('avSpacesApi', avSpacesApiFactory)
  .factory('avUsersApi', avUsersApiFactory)
  .factory('avUserPermissionsApi', avUserPermissionsApiFactory)
  .factory('avFilesApi', avFilesApiFactory)
  .factory('avSettingsApi', avSettingsApiFactory).name;
