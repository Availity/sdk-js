import AvMicroservice from '../ms';
import { AvApiConfig, RequestConfig, AvApiResponse } from '../api';

export interface AvFilesDeliveryConfig extends Partial<AvApiConfig> {
  customerId: string;
  clientId: string;
}

export default class AvFilesDelivery extends AvMicroservice {
  constructor(config: AvApiConfig & { http: (config: RequestConfig) => Promise<AvApiResponse> });

  uploadFilesDelivery<T = unknown>(data: unknown, config: AvFilesDeliveryConfig): Promise<AvApiResponse<T>>;

  getLocation(response: AvApiResponse<{ id: string }>): string;
}
