import AvApi, { AvApiConfig, RequestConfig, AvApiResponse } from '../api';
import type {
  CustomerOrganization,
  CustomerOrganizationResponse,
  CustomerOrganizationsResponse,
  CustomerRegion,
  CustomerRegionsResponse,
} from '../types';

export type { CustomerOrganization, CustomerRegion, CustomerRegionsResponse } from '../types';

export default class AvCustomerManagement extends AvApi {
  constructor(config: AvApiConfig & { http: (config: RequestConfig) => Promise<AvApiResponse> });

  // --- Organizations ---

  /** GET /organizations/:customerId — returns { status, organization } */
  getOrganization<T = CustomerOrganizationResponse>(customerId: string | number): Promise<AvApiResponse<T>>;

  /** GET /organizations — query organizations with optional filter params */
  getOrganizations<T = CustomerOrganizationsResponse>(config?: Partial<AvApiConfig>): Promise<AvApiResponse<T>>;

  /** Convenience: resolves to the organization object directly (unwrapped from response). */
  getOrganizationData(customerId: string | number): Promise<CustomerOrganization | undefined>;

  /** Search organizations by name. */
  searchByName<T = CustomerOrganizationsResponse>(
    name: string,
    config?: Partial<AvApiConfig>
  ): Promise<AvApiResponse<T>>;

  /** Search organizations by tax ID. */
  searchByTaxId<T = CustomerOrganizationsResponse>(
    taxId: string,
    config?: Partial<AvApiConfig>
  ): Promise<AvApiResponse<T>>;

  // --- Regions (legacy/sdk/platform/v1/regions) ---

  /** GET /regions — list all regions. Supports { sortBy, sortDirection } params. */
  getRegions<T = CustomerRegionsResponse>(config?: Partial<AvApiConfig>): Promise<AvApiResponse<T>>;

  /** GET /regions/:regionCode — get a specific region by code (e.g. 'FL'). */
  getRegion<T = CustomerRegion>(regionCode: string): Promise<AvApiResponse<T>>;

  /** GET /regions?currentlySelected=true — get the currently selected region. */
  getCurrentRegion<T = CustomerRegionsResponse>(): Promise<AvApiResponse<T>>;

  /** PUT /regions/:regionCode?akaName=... — switch the active region for the given user. */
  setCurrentRegion(regionCode: string, akaName: string): Promise<AvApiResponse>;
}
