import AvApi, { AvApiConfig, RequestConfig, AvApiResponse } from '../api';

export default class AvProxy extends AvApi {
  constructor(config: AvApiConfig & { tenant: string; http: (config: RequestConfig) => Promise<AvApiResponse> });
}
