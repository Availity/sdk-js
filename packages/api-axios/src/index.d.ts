/* eslint-disable max-classes-per-file */
import { AxiosRequestConfig, AxiosResponse, AxiosStatic } from 'axios';
import AvApiCore, {
  AvApiConfig,
  AvMicroservice,
  AvCodes,
  AvDisclaimers,
  AvFiles,
  AvFilesDelivery,
  AvLogMessages,
  DmaLogMessages,
  AvDmaCloud,
  AvTelemetry,
  AvNavigation,
  AvNotifications,
  AvOrganizations,
  AvPdfs,
  AvPdfMicroservice,
  AvPermissions,
  AvProviders,
  AvProxy,
  AvRegions,
  AvRouteConfigurations,
  AvSettings,
  AvSpaces,
  AvStash,
  AvUsers,
  AvUserPermissions,
  AvWebQL,
} from '@availity/api-core';

export type { AvApiResponse, RequestConfig, PaginatedData } from '@availity/api-core';

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
} from '@availity/api-core';

export interface ApiConfig extends AvApiConfig, AxiosRequestConfig {
  http?: AxiosStatic;
}

declare class AvApi extends AvApiCore {
  constructor(options: ApiConfig);
}

declare class AvMicroserviceApi extends AvMicroservice {
  constructor(options: ApiConfig);
}

export interface ProxyApiConfig extends ApiConfig {
  tenant: string;
}

declare class AvProxyApi extends AvProxy {}
declare class AvCodesApi extends AvCodes {}
declare const avCodesApi: AvCodesApi;

declare class AvDisclaimersApi extends AvDisclaimers {}
declare const avDisclaimersApi: AvDisclaimersApi;

declare class AvFilesApi extends AvFiles {
  uploadFile(
    data: unknown,
    config: ApiConfig & { customerId: string; clientId: string; fileName?: string; id?: string }
  ): Promise<AxiosResponse>;
}

declare const avFilesApi: AvFilesApi;

declare class AvFilesDeliveryApi extends AvFilesDelivery {}
declare const avFilesDeliveryApi: AvFilesDeliveryApi;

declare class AvLogMessagesApi extends AvLogMessages {}
declare class AvLogMessagesApiV2 extends DmaLogMessages {}
declare class AvLogMessagesApiV3 extends AvDmaCloud {}
declare class AvTelemetryApi extends AvTelemetry {}

declare const avLogMessagesApi: AvLogMessagesApi;
declare const avLogMessagesApiV2: AvLogMessagesApiV2;
declare const avLogMessagesApiV3: AvLogMessagesApiV3;
declare const avTelemetryApi: AvTelemetryApi;

declare class AvNavigationApi extends AvNavigation {}
declare const avNavigationApi: AvNavigationApi;

declare class AvNotificationsApi extends AvNotifications {}
declare const avNotificationsApi: AvNotificationsApi;

declare class AvOrganizationsApi extends AvOrganizations {}
declare const avOrganizationsApi: AvOrganizationsApi;

declare class AvPdfApi extends AvPdfs {}
declare const avPdfApi: AvPdfApi;

declare class AvPdfMicroserviceApi extends AvPdfMicroservice {}
declare const avPdfMicroserviceApi: AvPdfMicroserviceApi;

declare class AvPermissionsApi extends AvPermissions {}
declare const avPermissionsApi: AvPermissionsApi;

declare class AvProvidersApi extends AvProviders {}
declare const avProvidersApi: AvProvidersApi;

declare class AvRegionsApi extends AvRegions {}
declare const avRegionsApi: AvRegionsApi;

declare class AvRouteConfigurationsApi extends AvRouteConfigurations {}
declare const avRouteConfigurationsApi: AvRouteConfigurationsApi;

declare class AvSettingsApi extends AvSettings {}
declare const avSettingsApi: AvSettingsApi;

declare class AvSpacesApi extends AvSpaces {}
declare const avSpacesApi: AvSpacesApi;

declare class AvStashApi extends AvStash {}
declare const avStashApi: AvStashApi;

declare class AvUserApi extends AvUsers {}
declare const avUserApi: AvUserApi;

declare class AvUserPermissionsApi extends AvUserPermissions {}
declare const avUserPermissionsApi: AvUserPermissionsApi;

declare class AvWebQLApi extends AvWebQL {}
declare const avWebQLApi: AvWebQLApi;

export default AvApi;

export {
  AvMicroserviceApi,
  AvProxyApi,
  avCodesApi,
  AvCodesApi,
  avDisclaimersApi,
  AvDisclaimersApi,
  avFilesApi,
  AvFilesApi,
  avFilesDeliveryApi,
  AvFilesDeliveryApi,
  avLogMessagesApi,
  AvLogMessagesApi,
  avLogMessagesApiV2,
  AvLogMessagesApiV2,
  avLogMessagesApiV3,
  AvLogMessagesApiV3,
  avNavigationApi,
  AvNavigationApi,
  avNotificationsApi,
  AvNotificationsApi,
  avOrganizationsApi,
  AvOrganizationsApi,
  avPdfApi,
  AvPdfApi,
  avPdfMicroserviceApi,
  AvPdfMicroserviceApi,
  avPermissionsApi,
  AvPermissionsApi,
  avProvidersApi,
  AvProvidersApi,
  avRegionsApi,
  AvRegionsApi,
  avRouteConfigurationsApi,
  AvRouteConfigurationsApi,
  avSettingsApi,
  AvSettingsApi,
  avSpacesApi,
  AvSpacesApi,
  avStashApi,
  AvStashApi,
  avTelemetryApi,
  AvTelemetryApi,
  avUserApi,
  AvUserApi,
  avUserPermissionsApi,
  AvUserPermissionsApi,
  avWebQLApi,
  AvWebQLApi,
};
