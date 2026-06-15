// Domain model interfaces for Availity REST APIs
// These represent the shapes returned by the Availity platform APIs.

/** Pagination metadata in Aries REST responses */
export interface PaginationLinks {
  self: { href: string };
  next?: { href: string };
  last?: { href: string };
  previous?: { href: string };
}

/** Standard paginated collection envelope from Aries REST APIs */
export interface AriesPaginatedResponse {
  totalCount: number;
  count: number;
  offset: number;
  limit: number;
  links: PaginationLinks;
  [key: string]: unknown;
}

/** Helper: a paginated response with a known collection key */
export type PaginatedCollection<T, K extends string> = AriesPaginatedResponse & Record<K, T[]>;

// --- User ---

export interface User {
  id: string;
  userId: string;
  akaname: string;
  email: string;
  firstName: string;
  lastName: string;
  createDate: string;
  currentRegion: string;
  jobTitle?: string;
  userHasSecurityException?: boolean;
  userValidated?: boolean;
  [key: string]: unknown;
}

// --- Organization ---

export interface Address {
  line1?: string;
  line2?: string;
  city?: string;
  state?: string;
  stateCode?: string;
  zipCode?: string;
}

export interface Organization {
  id: string;
  customerId: string;
  name: string;
  status: string;
  statusCode: string;
  types?: { code: string; value: string }[];
  primaryControllingAuthority?: {
    lastName: string;
    firstName: string;
    primaryPhone?: string;
    email?: string;
  };
  physicalAddress?: Address;
  mailingAddress?: Address;
  billingAddress?: Address;
  regions?: { code: string; value: string }[];
  npis?: { number: string }[];
  taxIds?: { number: string; type: string }[];
  phoneNumber?: {
    areaCode: string;
    exchange: string;
    phoneNumber: string;
  };
  numberOfLicensedPhysicians?: string;
  numberOfLicensedClinicians?: string;
  links?: Record<string, { href: string }>;
  [key: string]: unknown;
}

export type OrganizationsResponse = PaginatedCollection<Organization, 'organizations'>;

// --- Region ---

export interface Region {
  id: string;
  value: string;
  [key: string]: unknown;
}

export interface RegionsResponse {
  regions: Region[];
  [key: string]: unknown;
}

// --- Provider ---

export interface Provider {
  id?: string;
  businessName?: string;
  lastName?: string;
  firstName?: string;
  npi?: string;
  name?: string;
  customerIds?: string[];
  [key: string]: unknown;
}

export type ProvidersResponse = PaginatedCollection<Provider, 'providers'>;

// --- Permission ---

export interface Permission {
  id: string;
  description?: string;
  organizations?: { id: string; name?: string; resources?: { id: string }[] }[];
  [key: string]: unknown;
}

export type PermissionsResponse = PaginatedCollection<Permission, 'permissions'>;

// --- Space ---

export interface Space {
  id: string;
  name?: string;
  description?: string;
  [key: string]: unknown;
}

// --- Settings ---

export interface SettingsResponse {
  settings: Array<Record<string, unknown>>;
  [key: string]: unknown;
}

// --- Codes ---

export interface Code {
  id: string;
  value?: string;
  [key: string]: unknown;
}

export type CodesResponse = PaginatedCollection<Code, 'codes'>;

// --- Disclaimer ---

export interface Disclaimer {
  id: string;
  text?: string;
  [key: string]: unknown;
}

export type DisclaimersResponse = PaginatedCollection<Disclaimer, 'disclaimers'>;

// --- Notification ---

export interface Notification {
  id: string;
  [key: string]: unknown;
}

// --- Route Configuration ---

export interface RouteConfiguration {
  id?: string;
  transactionTypeCode?: string;
  submissionModeCode?: string;
  payerId?: string;
  [key: string]: unknown;
}
