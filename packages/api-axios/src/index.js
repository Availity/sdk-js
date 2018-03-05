import AvApi from './api';
import AvMicroservice from './ms';
import logMessagesApi from './logs';
import navigationApi from './navigation';
import notificationApi from './notification';
import organizationsApi from './organizations';
import permissionsApi from './permissions';
import providersApi from './providers';
import ProxyApi from './proxy';
import regionsApi from './regions';
import spacesApi from './spaces';
import userApi from './user';
import pdfApi from './pdf';
import userPermissionsApi from './userPermissions';
import filesApi from './files';
import settingsApi from './settings';

export default AvApi;

export {
  AvMicroservice,
  ProxyApi,
  logMessagesApi,
  navigationApi,
  notificationApi,
  organizationsApi,
  permissionsApi,
  providersApi,
  regionsApi,
  pdfApi,
  spacesApi,
  userApi,
  userPermissionsApi,
  filesApi,
  settingsApi,
};
