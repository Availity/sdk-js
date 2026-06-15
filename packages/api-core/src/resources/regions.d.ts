import AvApi, { AvApiConfig, RequestConfig, AvApiResponse } from '../api';
import type { RegionsResponse } from '../types';
import AvUsers from './user';

export default class AvRegions extends AvApi {
  constructor(config: AvApiConfig & { http: (config: RequestConfig) => Promise<AvApiResponse>; avUsers: AvUsers });

  avUsers: AvUsers;

  afterUpdate(response: AvApiResponse): AvApiResponse;

  getRegions<T = RegionsResponse>(config?: Partial<AvApiConfig>): Promise<AvApiResponse<T>>;

  getCurrentRegion<T = RegionsResponse>(): Promise<AvApiResponse<T>>;
}
