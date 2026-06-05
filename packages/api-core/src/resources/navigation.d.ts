import AvApi, { AvApiConfig, RequestConfig, AvApiResponse } from '../api';

export default class AvNavigation extends AvApi {
  constructor(config: AvApiConfig & { http: (config: RequestConfig) => Promise<AvApiResponse> });
}
