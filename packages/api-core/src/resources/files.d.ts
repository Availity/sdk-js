import AvMicroservice from '../ms';
import { AvApiConfig, RequestConfig, AvApiResponse } from '../api';

export interface AvFilesConfig extends Partial<AvApiConfig> {
  customerId: string;
  clientId: string;
}

export default class AvFiles extends AvMicroservice {
  constructor(config: AvApiConfig & { http: (config: RequestConfig) => Promise<AvApiResponse> });

  uploadFile<T = unknown>(data: unknown, config: AvFilesConfig): Promise<AvApiResponse<T>>;
}
