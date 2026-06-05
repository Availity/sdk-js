import AvApi, { AvApiConfig, RequestConfig, AvApiResponse } from '../api';

export default class AvNotifications extends AvApi {
  constructor(config: AvApiConfig & { http: (config: RequestConfig) => Promise<AvApiResponse> });

  deleteByTopic<T = unknown>(topic: string, config?: Partial<AvApiConfig>): Promise<AvApiResponse<T>>;
}
