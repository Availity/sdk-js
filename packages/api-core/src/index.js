/* eslint-disable unicorn/prefer-export-from */
import AvApi from './api';
import AvMicroservice from './ms';
import deepMerge from './deepMerge';
import AvProxy from './resources/proxy';
import AvCodes from './resources/codes';
import AvDisclaimers from './resources/disclaimers';
import AvFiles from './resources/files';
import AvFilesDelivery from './resources/filesDelivery';
import AvLogMessages from './resources/logs';
import AvLogMessagesV2 from './resources/dma';
import AvLogMessagesV3 from './resources/dma-cloud';
import AvNavigation from './resources/navigation';
import AvNotification from './resources/notifications';
import AvOrganizations from './resources/organizations';
import AvPdf from './resources/pdfs';
import AvPdfMicroservice from './resources/pdfv2';
import AvPermissions from './resources/permissions';
import AvProviders from './resources/providers';
import AvRegions from './resources/regions';
import AvRouteConfigurations from './resources/routeConfigurations';
import AvSettings from './resources/settings';
import AvSpaces from './resources/spaces';
import AvStash from './resources/stash';
import AvTelemetry from './resources/telemetry';
import AvUserPermissions from './resources/userPermissions';
import AvUsers from './resources/user';
import AvWebQL from './resources/webQL';

export default AvApi;

export {
  deepMerge,
  AvMicroservice,
  AvProxy,
  AvCodes,
  AvDisclaimers,
  AvFiles,
  AvFilesDelivery,
  AvLogMessages,
  AvLogMessagesV2,
  AvLogMessagesV3,
  AvNavigation,
  AvNotification,
  AvOrganizations,
  AvPdf,
  AvPdfMicroservice,
  AvPermissions,
  AvProviders,
  AvRegions,
  AvRouteConfigurations,
  AvSettings,
  AvSpaces,
  AvStash,
  AvTelemetry,
  AvUserPermissions,
  AvUsers,
  AvWebQL,
};
