/* eslint-disable unicorn/prefer-export-from */
import AvApi from './api';
import AvMicroservice from './ms';
import AvProxy from './resources/proxy';
import AvCodes from './resources/codes';
import AvDisclaimers from './resources/disclaimers';
import AvFiles from './resources/files';
import AvFilesDelivery from './resources/filesDelivery';
import AvLogMessages from './resources/logs';
import AvLogMessagesV2 from './resources/dma';
import AvNavigation from './resources/navigation';
import AvNotification from './resources/notifications';
import AvOrganizations from './resources/organizations';
import AvPdf from './resources/pdfs';
import AvPermissions from './resources/permissions';
import AvProviders from './resources/providers';
import AvRegions from './resources/regions';
import AvSettings from './resources/settings';
import AvSpaces from './resources/spaces';
import AvUserPermissions from './resources/userPermissions';
import AvUsers from './resources/user';
import AvWebQL from './resources/webQL';

export default AvApi;

export {
  AvMicroservice,
  AvProxy,
  AvCodes,
  AvDisclaimers,
  AvFiles,
  AvFilesDelivery,
  AvLogMessages,
  AvLogMessagesV2,
  AvNavigation,
  AvNotification,
  AvOrganizations,
  AvPdf,
  AvPermissions,
  AvProviders,
  AvRegions,
  AvSettings,
  AvSpaces,
  AvUserPermissions,
  AvUsers,
  AvWebQL,
};
