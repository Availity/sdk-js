export interface AvApiConfig {
  /** HTTP client function (e.g. axios) */
  http?: (config: RequestConfig) => Promise<AvApiResponse>;
  /** Base path segment for API endpoints */
  path?: string;
  /** Full URL to API resource (overrides path-based construction) */
  url?: string | null;
  /** Resource name */
  name?: string | null;
  /** API version segment (default: '/v1') */
  version?: string | null;
  /** Whether to cache requests */
  cache?: boolean;
  /** Enable Availity REST API behaviors */
  api?: boolean;
  /** Enable 202 polling */
  polling?: boolean;
  /** Polling intervals in ms */
  pollingIntervals?: number[];
  /** HTTP method for polling requests */
  pollingMethod?: string;
  /** Request headers */
  headers?: Record<string, string>;
  /** Cache bust with timestamp */
  cacheBust?: boolean | (() => string | number) | string | number;
  /** Page-level cache bust */
  pageBust?: boolean | (() => string | number) | string | number;
  /** Session-level cache bust */
  sessionBust?: boolean | (() => string | number) | string | number;
  /** Send credentials on CORS requests */
  withCredentials?: boolean;
  /** Request method */
  method?: string;
  /** Request data/body */
  data?: unknown;
  /** Query parameters */
  params?: Record<string, unknown>;
  /** Current polling attempt count */
  attempt?: number;
  /** Resource ID */
  id?: string;
  /** Additional config options */
  [key: string]: unknown;
}

export interface RequestConfig extends AvApiConfig {
  method: string;
  url: string;
}

export interface AvApiResponse<T = unknown> {
  data: T;
  status: number;
  headers: Record<string, string>;
  config: RequestConfig;
}

export interface PaginatedData<T = unknown> {
  totalCount: number;
  limit: number;
  offset: number;
  [key: string]: T[] | unknown;
}

export default class AvApi {
  constructor(config: AvApiConfig & { http: (config: RequestConfig) => Promise<AvApiResponse> });

  /** The HTTP client function */
  http: (config: RequestConfig) => Promise<AvApiResponse>;

  /** Default configuration for this API instance */
  defaultConfig: AvApiConfig;

  /** Merge defaults with provided config */
  config(config?: Partial<AvApiConfig>): AvApiConfig;

  /** Add query parameters to config */
  addParams(params?: Record<string, unknown>, config?: Partial<AvApiConfig>, newObj?: boolean): AvApiConfig;

  /** Get session bust value from localStorage */
  getSessionBust(): string | null;

  /** Apply cache-busting params to config */
  cacheParams(config: AvApiConfig): AvApiConfig;

  /** Resolve cache bust value from various input types */
  getCacheBustVal(cacheBust: unknown, defaultFn?: () => string | number): string | number | undefined;

  /** Get page-level bust value */
  getPageBust(): number;

  /** Set page-level bust value */
  setPageBust(value?: number): void;

  /** Page bust value storage */
  pageBustValue: number | undefined;

  /** Build URL from config and optional ID */
  getUrl(config: AvApiConfig, id?: string): string;

  /** Get the request URL using default config */
  getRequestUrl(): string;

  /** Extract Location header from response */
  getLocation(response: AvApiResponse): string | undefined;

  /** Determine if response should trigger polling */
  shouldPoll(response: AvApiResponse): boolean;

  /** Handle response, including polling logic */
  onResponse<T>(response: AvApiResponse<T>, afterResponse?: (response: AvApiResponse<T>) => unknown): Promise<unknown>;

  /** Execute an HTTP request */
  request<T>(config: AvApiConfig, afterResponse?: (response: AvApiResponse<T>) => unknown): Promise<AvApiResponse<T>>;

  /** Send data via sendBeacon with fallback to POST */
  sendBeacon(data: string, config?: Partial<AvApiConfig>): Promise<AvApiResponse | void>;

  /** Create a resource (POST) */
  create<T = unknown>(data: unknown, config?: Partial<AvApiConfig>): Promise<AvApiResponse<T>>;

  /** Alias for create */
  post<T = unknown>(data: unknown, config?: Partial<AvApiConfig>): Promise<AvApiResponse<T>>;

  /** POST with X-HTTP-Method-Override: GET */
  postGet<T = unknown>(data: unknown, config?: Partial<AvApiConfig>): Promise<AvApiResponse<T>>;

  /** Get a single resource by ID */
  get<T = unknown>(id: string | number, config?: Partial<AvApiConfig>): Promise<AvApiResponse<T>>;

  /** Query resources (GET without ID) */
  query<T = unknown>(config?: Partial<AvApiConfig>): Promise<AvApiResponse<T>>;

  /** Fetch all pages of a paginated resource */
  all<T = unknown>(config?: Partial<AvApiConfig>): Promise<T[]>;

  /** Get the array key from response data */
  getQueryResultKey(data: Record<string, unknown>): string | undefined;

  /** Get the result array from response data */
  getResult<T = unknown>(data: Record<string, unknown>): T[] | undefined;

  /** Fetch a specific page */
  getPage<T = unknown>(page?: number, config?: Partial<AvApiConfig>, limit?: number): Promise<AvApiResponse<T>>;

  /** Update a resource (PUT) */
  update<T = unknown>(id: string | number, data: unknown, config?: Partial<AvApiConfig>): Promise<AvApiResponse<T>>;
  update<T = unknown>(data: unknown, config?: Partial<AvApiConfig>): Promise<AvApiResponse<T>>;

  /** Alias for update */
  put<T = unknown>(...args: unknown[]): Promise<AvApiResponse<T>>;

  /** Partially update a resource (PATCH) */
  patch<T = unknown>(id: string | number, data: unknown, config?: Partial<AvApiConfig>): Promise<AvApiResponse<T>>;
  patch<T = unknown>(data: unknown, config?: Partial<AvApiConfig>): Promise<AvApiResponse<T>>;

  /** Remove a resource (DELETE) */
  remove<T = unknown>(id: string | number, config?: Partial<AvApiConfig>): Promise<AvApiResponse<T>>;
  remove<T = unknown>(config?: Partial<AvApiConfig>): Promise<AvApiResponse<T>>;

  /** Alias for remove */
  delete<T = unknown>(...args: unknown[]): Promise<AvApiResponse<T>>;

  /** Hook: transform data before create/post */
  beforeCreate?(data: unknown): unknown;
  beforePost?(data: unknown): unknown;

  /** Hook: transform data before update/put */
  beforeUpdate?(data: unknown): unknown;
  beforePut?(data: unknown): unknown;

  /** Hook: transform data before patch */
  beforePatch?(data: unknown): unknown;

  /** Hook: transform config before remove/delete */
  beforeRemove?(config: AvApiConfig): AvApiConfig;
  beforeDelete?(config: AvApiConfig): AvApiConfig;

  /** Hook: transform data before postGet */
  beforePostGet?(data: unknown): unknown;

  /** Hook: transform response after create/post */
  afterCreate?(response: AvApiResponse): unknown;
  afterPost?(response: AvApiResponse): unknown;

  /** Hook: transform response after get */
  afterGet?(response: AvApiResponse): unknown;

  /** Hook: transform response after query */
  afterQuery?(response: AvApiResponse): unknown;

  /** Hook: transform response after postGet */
  afterPostGet?(response: AvApiResponse): unknown;

  /** Hook: transform response after update/put */
  afterUpdate?(response: AvApiResponse): unknown;
  afterPut?(response: AvApiResponse): unknown;

  /** Hook: transform response after patch */
  afterPatch?(response: AvApiResponse): unknown;

  /** Hook: transform response after remove/delete */
  afterRemove?(response: AvApiResponse): unknown;
  afterDelete?(response: AvApiResponse): unknown;
}
