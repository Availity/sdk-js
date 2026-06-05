import AvMicroservice from '../ms';
import { AvApiConfig, RequestConfig, AvApiResponse } from '../api';

export default class AvPdfMicroservice extends AvMicroservice {
  constructor(config: AvApiConfig & { http: (config: RequestConfig) => Promise<AvApiResponse> });

  getUrl(config: Partial<AvApiConfig>, id?: string): string;
}
