import angular from 'angular';

import avApiOptionsProvider from './options';
import AvApiFactory from './api';
import AvMicroserviceApiFactory from './ms';

import AvProxyApiFactory from './proxy';
import avLogMessagesApiFactory from './logs';
import avDmaMessagesApiFactory from './dma';
import avNavigationApiFactory from './navigation';
import avNotificationApiFactory from './notification';
import avOrganizationsApiFactory from './organizations';
import avPermissionsApiFactory from './permissions';
import avProvidersApiFactory from './providers';
import avRegionsApiFactory from './regions';
import avPdfApiFactory from './pdfs';
import avSpacesApiFactory from './spaces';
import avUsersApiFactory from './user';
import avUserPermissionsApiFactory from './userPermissions';
import avFilesApiFactory from './files';
import avFilesDeliveryApiFactory from './filesDelivery';
import avSettingsApiFactory from './settings';
import avCodesApiFactory from './codes';

export default angular
  .module('availity.api', ['ng'])
  .provider('avApiOptions', avApiOptionsProvider)
  .factory('AvApi', AvApiFactory)
  .factory('AvMicroserviceApi', AvMicroserviceApiFactory)
  .factory('AvProxyApi', AvProxyApiFactory)
  .factory('avLogMessagesApi', avLogMessagesApiFactory)
  .factory('avDmaMessagesApi', avDmaMessagesApiFactory)
  .factory('avPdfApi', avPdfApiFactory)
  .factory('avNavigationApi', avNavigationApiFactory)
  .factory('avNotificationApi', avNotificationApiFactory)
  .factory('avOrganizationsApi', avOrganizationsApiFactory)
  .factory('avPermissionsApi', avPermissionsApiFactory)
  .factory('avProvidersApi', avProvidersApiFactory)
  .factory('avRegionsApi', avRegionsApiFactory)
  .factory('avSpacesApi', avSpacesApiFactory)
  .factory('avUsersApi', avUsersApiFactory)
  .factory('avUserPermissionsApi', avUserPermissionsApiFactory)
  .factory('avFilesApi', avFilesApiFactory)
  .factory('avFilesDeliveryApi', avFilesDeliveryApiFactory)
  .factory('avSettingsApi', avSettingsApiFactory)
  .factory('avCodesApi', avCodesApiFactory).name;
