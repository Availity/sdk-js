import AvApi from './api';
import AvMicroserviceApi from './ms';
import AvProxyApi from './proxy';

import AvCodesApi, { avCodesApi } from './resources/codes';
import AvDisclaimersApi, { avDisclaimersApi } from './resources/disclaimers';
import AvLogMessagesApiV2, { avLogMessagesApiV2 } from './resources/dma';
import AvFilesApi, { avFilesApi } from './resources/files';
import AvFilesDeliveryApi, { avFilesDeliveryApi } from './resources/filesDelivery';
import AvLogMessagesApi, { avLogMessagesApi } from './resources/logs';
import AvNavigationApi, { avNavigationApi } from './resources/navigation';
import AvNotificationsApi, { avNotificationsApi } from './resources/notifications';
import AvOrganizationsApi, { avOrganizationsApi } from './resources/organizations';
import AvPdfApi, { avPdfApi } from './resources/pdf';
import AvPermissionsApi, { avPermissionsApi } from './resources/permissions';
import AvProvidersApi, { avProvidersApi } from './resources/providers';
import AvRegionsApi, { avRegionsApi } from './resources/regions';
import AvRouteConfigurationsApi, { avRouteConfigurationsApi } from './resources/routeConfigurations';
import AvSettingsApi, { avSettingsApi } from './resources/settings';
import AvSlotMachineApi, { avSlotMachineApi } from './resources/slotmachine';
import AvSpacesApi, { avSpacesApi } from './resources/spaces';
import AvTelemetryApi, { avTelemetryApi } from './resources/telemetry';
import AvUserApi, { avUserApi } from './resources/user';
import AvUserPermissionsApi, { avUserPermissionsApi } from './resources/userPermissions';
import AvWebQLApi, { avWebQLApi } from './resources/webQL';

export default AvApi;

export {
  AvMicroserviceApi,
  AvProxyApi,
  AvCodesApi,
  avCodesApi,
  AvDisclaimersApi,
  avDisclaimersApi,
  AvFilesApi,
  avFilesApi,
  AvFilesDeliveryApi,
  avFilesDeliveryApi,
  AvLogMessagesApi,
  avLogMessagesApi,
  AvLogMessagesApiV2,
  avLogMessagesApiV2,
  AvNavigationApi,
  avNavigationApi,
  AvNotificationsApi,
  avNotificationsApi,
  AvOrganizationsApi,
  avOrganizationsApi,
  AvPdfApi,
  avPdfApi,
  AvPermissionsApi,
  avPermissionsApi,
  AvProvidersApi,
  avProvidersApi,
  AvRegionsApi,
  avRegionsApi,
  AvRouteConfigurationsApi,
  avRouteConfigurationsApi,
  AvSettingsApi,
  avSettingsApi,
  AvSlotMachineApi,
  avSlotMachineApi,
  AvSpacesApi,
  avSpacesApi,
  AvTelemetryApi,
  avTelemetryApi,
  AvUserPermissionsApi,
  avUserPermissionsApi,
  AvUserApi,
  avUserApi,
  AvWebQLApi,
  avWebQLApi,
};
