import AvApi, { AvApiConfig, RequestConfig, AvApiResponse } from '../api';
import AvUsers from './user';

export default class AvSettings extends AvApi {
  constructor(config: AvApiConfig & { http: (config: RequestConfig) => Promise<AvApiResponse>; avUsers: AvUsers });

  avUsers: AvUsers;

  getApplication<T = unknown>(applicationId: string, config?: Partial<AvApiConfig>): Promise<AvApiResponse<T>>;

  setApplication<T = unknown>(
    applicationId: string | Record<string, unknown>,
    data?: Record<string, unknown>,
    config?: Partial<AvApiConfig>
  ): Promise<AvApiResponse<T>>;
}
