import AvApi, { AvApiConfig, RequestConfig, AvApiResponse } from '../api';
import type { ManagedUser } from '../types';

export type { ManagedUser } from '../types';

export default class AvUserManagement extends AvApi {
  constructor(config: AvApiConfig & { http: (config: RequestConfig) => Promise<AvApiResponse> });

  /** GET /users/me — returns the current user's full profile response */
  me<T = ManagedUser>(): Promise<AvApiResponse<T>>;

  /** GET /users/:akaName — returns a specific user's profile response */
  getUser<T = ManagedUser>(akaName: string): Promise<AvApiResponse<T>>;

  /** Convenience: resolves to the current user data object directly (unwrapped). */
  getMe(): Promise<ManagedUser | undefined>;

  /** Returns the current user's Jira/platform numeric user ID. */
  getUserId(): Promise<string | undefined>;

  /** Returns the current user's akaName (username). */
  getAkaName(): Promise<string | undefined>;

  /** Returns the current user's active region code (e.g. 'FL'). */
  getCurrentRegion(): Promise<string | undefined>;
}
