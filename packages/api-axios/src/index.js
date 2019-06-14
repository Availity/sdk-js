import AvApi from './api';
import AvMicroserviceApi from './ms';
import AvProxyApi from './proxy';
import avLogMessagesApi from './logs';
import avLogMessagesApiV2 from './dma';
import avNavigationApi from './navigation';
import avNotificationApi from './notification';
import avOrganizationsApi from './organizations';
import avPermissionsApi from './permissions';
import avProvidersApi from './providers';
import avRegionsApi from './regions';
import avSpacesApi from './spaces';
import avUserApi from './user';
import avPdfApi from './pdf';
import avUserPermissionsApi from './userPermissions';
import avFilesApi from './files';
import avFilesDeliveryApi from './filesDelivery';
import avSettingsApi from './settings';
import avSlotMachineApi from './slotmachine';
import avDisclaimersApi from './disclaimers';
import avCodesApi from './codes';

export default AvApi;

export {
  AvMicroserviceApi,
  AvProxyApi,
  avLogMessagesApi,
  avLogMessagesApiV2,
  avNavigationApi,
  avNotificationApi,
  avOrganizationsApi,
  avPermissionsApi,
  avProvidersApi,
  avRegionsApi,
  avPdfApi,
  avSpacesApi,
  avUserApi,
  avUserPermissionsApi,
  avFilesApi,
  avFilesDeliveryApi,
  avSettingsApi,
  avSlotMachineApi,
  avDisclaimersApi,
  avCodesApi,
};
