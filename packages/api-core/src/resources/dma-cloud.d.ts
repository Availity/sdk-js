import AvMicroservice from '../ms';
import { AvApiConfig, RequestConfig, AvApiResponse } from '../api';

export interface DmaCloudEntries {
  overrides?: Record<string, unknown>;
  [key: string]: unknown;
}

export default class AvDmaCloud extends AvMicroservice {
  constructor(config: AvApiConfig & { http: (config: RequestConfig) => Promise<AvApiResponse> });

  send(level: string, entries: DmaCloudEntries): string;

  debug(entries: DmaCloudEntries): Promise<AvApiResponse | void>;

  info(entries: DmaCloudEntries): Promise<AvApiResponse | void>;

  warn(entries: DmaCloudEntries): Promise<AvApiResponse | void>;

  error(entries: DmaCloudEntries): Promise<AvApiResponse | void>;
}
