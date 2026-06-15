import AvApi, { AvApiConfig, RequestConfig, AvApiResponse } from '../api';
import type { SettingsResponse } from '../types';
import AvUsers from './user';

export default class AvSettings extends AvApi {
  constructor(config: AvApiConfig & { http: (config: RequestConfig) => Promise<AvApiResponse>; avUsers: AvUsers });

  avUsers: AvUsers;

  getApplication<T = SettingsResponse>(applicationId: string, config?: Partial<AvApiConfig>): Promise<AvApiResponse<T>>;

  setApplication<T = SettingsResponse>(
    applicationId: string | Record<string, unknown>,
    data?: Record<string, unknown>,
    config?: Partial<AvApiConfig>
  ): Promise<AvApiResponse<T>>;
}
