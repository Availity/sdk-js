import AvApi, { AvApiConfig, RequestConfig, AvApiResponse } from '../api';

export default class AvStash extends AvApi {
  constructor(config: AvApiConfig & { http: (config: RequestConfig) => Promise<AvApiResponse> });

  launch(params?: Record<string, unknown>, linkTo?: string): Promise<string>;
}
