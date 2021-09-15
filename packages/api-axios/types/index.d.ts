import { AxiosResponse } from 'axios';

export interface ApiConfig {
  path?: string;
  url?: string;
  name?: string;
  version?: string;
  cache?: boolean;
  api?: boolean;
  polling?: boolean;
  pollingIntervals?: number[];
  pollingMethod?: string;
  headers?: Record<string, unknown>;
  sessionBust?: boolean;
  withCredentials?: boolean;
}

export interface RequestConfig extends ApiConfig {
  params?: Record<string, string | string[] | number | number[] | undefined>;
}

type Request = any;

declare class AvApi {
  constructor(options: ApiConfig);

  // Create
  create<TData = any>(
    data: Request,
    config?: RequestConfig
  ): Promise<AxiosResponse<TData>>;

  post<TData = any>(
    data: Request,
    config?: RequestConfig
  ): Promise<AxiosResponse<TData>>;

  postGet<TData = any>(
    data: Request,
    config?: RequestConfig
  ): Promise<AxiosResponse<TData>>;

  // Read
  get<TData = any>(
    id: string,
    config?: RequestConfig
  ): Promise<AxiosResponse<TData>>;

  query<TData = any>(config: RequestConfig): Promise<AxiosResponse<TData>>;

  // Update
  update<TData = any>(
    id: string,
    data: Request,
    config?: RequestConfig
  ): Promise<AxiosResponse<TData>>;

  put<TData = any>(
    id: string,
    data: Request,
    config?: RequestConfig
  ): Promise<AxiosResponse<TData>>;

  patch<TData = any>(
    id: string,
    data: Request,
    config?: RequestConfig
  ): Promise<AxiosResponse<TData>>;

  // Delete
  remove<TData = any>(
    id: string,
    config?: RequestConfig
  ): Promise<AxiosResponse<TData>>;

  delete<TData = any>(
    id: string,
    config?: RequestConfig
  ): Promise<AxiosResponse<TData>>;
}

interface AvDisclaimersApi extends AvApi {
  getDisclaimers(id: string, config?: RequestConfig): Promise<AxiosResponse>;
}

interface AvFilesApi extends AvApi {
  uploadFile(data: any, config?: RequestConfig): Promise<AxiosResponse>;
}

interface AvFilesDeliveryApi extends AvApi {
  uploadFilesDelivery(
    data: any,
    config?: RequestConfig
  ): Promise<AxiosResponse>;
  getLocation(response: any): string;
}

interface AvNotificationsApi extends AvApi {
  deleteByTopic(topic: string, config?: RequestConfig): Promise<AxiosResponse>;
}

interface AvLogMessagesApi extends AvApi {
  send(
    level: 'info' | 'debug' | 'warn' | 'error',
    entries: Record<string, any>
  ): Promise<AxiosResponse>;
  debug(entries: Record<string, any>): Promise<AxiosResponse>;
  info(entries: Record<string, any>): Promise<AxiosResponse>;
  warn(entries: Record<string, any>): Promise<AxiosResponse>;
  error(entries: Record<string, any>): Promise<AxiosResponse>;
}

interface AvOrganizationsApi extends AvApi {
  queryOrganizations(
    user: { id: string },
    config?: RequestConfig
  ): Promise<AxiosResponse>;
  getOrganizations(config: RequestConfig): Promise<AxiosResponse>;
  postGet(
    data: any,
    config?: RequestConfig,
    additionalPostGetArgs?: Record<string, any>
  ): Promise<AxiosResponse>;
  getFilteredOrganizations(
    additionalPostGetArgs: Record<string, any>,
    data: any
  ): Promise<AxiosResponse>;
  arePermissionsEqual(permissionId): boolean;
  sanitizeIds<T = string | number | string[] | number[]>(
    unsanitized: T
  ): string | string[];
}

interface AvPdfsApi extends AvApi {
  onPdf(response: any): void;
  getPdf(data: any, config?: RequestConfig): Promise<AxiosResponse>;
}

interface AvPermissionsApi extends AvApi {
  getPermissions(id: string, region: string): Promise<AxiosResponse>;
}

type Provider = {
  name: string;
  businessName: string;
  lastName: string;
  firstName: string;
};
interface AvProvidersApi extends AvApi {
  getProviders(
    customerId: string,
    config?: RequestConfig
  ): Promise<AxiosResponse>;
  normalize(providers: Provider[]): Provider[];
}

interface AvRegionsApi extends AvApi {
  afterUpdate(response: any): any;
  getRegions(config?: RequestConfig): Promise<AxiosResponse>;
  getCurrentRegion(): Promise<AxiosResponse>;
}

interface AvSettingsApi extends AvApi {
  getApplication(
    applicationId: string,
    config?: RequestConfig
  ): Promise<AxiosResponse>;
  setApplication(
    applicationId: string,
    data: any,
    config?: RequestConfig
  ): Promise<AxiosResponse>;
}

interface AvSlotMachineApi extends Omit<AvApi, 'query'> {
  query<TData = any>(data: any, variables: any): Promise<AxiosResponse<TData>>;
}

interface AvSpacesApi extends AvApi {
  parseSpaceId(query: string): string;
  getSpaceName(spaceId: string): Promise<string>;
}

interface AvUsersApi extends AvApi {
  me(config?: RequestConfig): Promise<any>;
}

type Resource = {
  id: string;
  payerId: string;
  payerName: string;
};

type Organization = {
  id: string;
  customerId: string;
  name: string;
  resources: Resource[];
};

type AxiUserPermission = {
  id: string;
  description: string;
  organizations: Organization[];
};

interface AvUserPermissionsApi extends AvApi {
  afterQuery(response: any): AxiUserPermission[];
  getPermissions(
    permissionId: string | string[],
    region?: string
  ): Promise<AxiosResponse<{ axiUserPermissions: AxiUserPermission[] }>>;
}

export default AvApi;

declare class AvMicroserviceApi extends AvApi {}
declare class AvProxyApi extends AvApi {}

declare const avCodesApi: AvApi;
declare const avDisclaimersApi: AvDisclaimersApi;
declare const avFilesApi: AvFilesApi;
declare const avFilesDeliveryApi: AvFilesDeliveryApi;
declare const avLogMessagesApi: AvLogMessagesApi;
declare const avLogMessagesApiV2: AvLogMessagesApi;
declare const avNavigationApi: AvApi;
declare const avNotificationApi: AvNotificationsApi;
declare const avOrganizationsApi: AvOrganizationsApi;
declare const avPdfApi: AvPdfsApi;
declare const avPermissionsApi: AvPermissionsApi;
declare const avProvidersApi: AvProvidersApi;
declare const avRegionsApi: AvRegionsApi;
declare const avSettingsApi: AvSettingsApi;
declare const avSlotMachineApi: AvSlotMachineApi;
declare const avSpacesApi: AvSpacesApi;
declare const avUserApi: AvUsersApi;
declare const avUserPermissionsApi: AvUserPermissionsApi;
declare const avWebQLApi: AvApi;

export {
  AvMicroserviceApi,
  AvProxyApi,
  avCodesApi,
  avDisclaimersApi,
  avFilesApi,
  avFilesDeliveryApi,
  avLogMessagesApi,
  avLogMessagesApiV2,
  avNavigationApi,
  avNotificationApi,
  avOrganizationsApi,
  avPdfApi,
  avPermissionsApi,
  avProvidersApi,
  avRegionsApi,
  avSettingsApi,
  avSlotMachineApi,
  avSpacesApi,
  avUserApi,
  avUserPermissionsApi,
  avWebQLApi,
};
