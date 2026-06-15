export type { AvApiConfig, AvApiResponse, RequestConfig, PaginatedData } from './api';
export { default as AvApi } from './api';
export { default as AvMicroservice } from './ms';
// eslint-disable-next-line no-restricted-exports
export { default } from './api';

// Domain model types
export type {
  AriesPaginatedResponse,
  PaginatedCollection,
  PaginationLinks,
  User,
  Address,
  Organization,
  OrganizationsResponse,
  Region,
  RegionsResponse,
  Provider,
  ProvidersResponse,
  Permission,
  PermissionsResponse,
  Space,
  SettingsResponse,
  Code,
  CodesResponse,
  Disclaimer,
  DisclaimersResponse,
  Notification,
  RouteConfiguration,
} from './types';

// Resources
export { default as AvCodes } from './resources/codes';
export { default as AvDisclaimers } from './resources/disclaimers';
export { default as AvDmaCloud } from './resources/dma-cloud';
export { default as DmaLogMessages } from './resources/dma';
export { default as AvFiles } from './resources/files';
export { default as AvFilesDelivery } from './resources/filesDelivery';
export { default as AvLogMessages } from './resources/logs';
export { default as AvNavigation } from './resources/navigation';
export { default as AvNotifications } from './resources/notifications';
export { default as AvOrganizations } from './resources/organizations';
export { default as AvPdfs } from './resources/pdfs';
export { default as AvPdfMicroservice } from './resources/pdfv2';
export { default as AvPermissions } from './resources/permissions';
export { default as AvProviders } from './resources/providers';
export { default as AvProxy } from './resources/proxy';
export { default as AvRegions } from './resources/regions';
export { default as AvRouteConfigurations } from './resources/routeConfigurations';
export { default as AvSettings } from './resources/settings';
export { default as AvSpaces } from './resources/spaces';
export { default as AvStash } from './resources/stash';
export { default as AvTelemetry } from './resources/telemetry';
export { default as AvUsers } from './resources/user';
export { default as AvUserPermissions } from './resources/userPermissions';
export { default as AvWebQL } from './resources/webQL';

// Resource types
export type { AvFilesConfig } from './resources/files';
export type { AvFilesDeliveryConfig } from './resources/filesDelivery';
export type { PdfData } from './resources/pdfs';
export type { LogEntries } from './resources/logs';
export type { DmaEntries } from './resources/dma';
export type { DmaCloudEntries } from './resources/dma-cloud';
export type { TelemetryData } from './resources/telemetry';
export type { PermissionIds, PostGetArgs, FilteredOrganization } from './resources/organizations';

// Utilities
export declare function deepMerge<T extends Record<string, unknown>>(
  target: T,
  ...sources: Record<string, unknown>[]
): T;
