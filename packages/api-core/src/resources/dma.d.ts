import AvMicroservice from '../ms';
import { AvApiConfig, RequestConfig, AvApiResponse } from '../api';

export interface DmaEntries {
  overrides?: Record<string, unknown>;
  [key: string]: unknown;
}

export default class DmaLogMessages extends AvMicroservice {
  constructor(config: AvApiConfig & { http: (config: RequestConfig) => Promise<AvApiResponse> });

  send(level: string, entries: DmaEntries): string;

  debug(entries: DmaEntries): Promise<AvApiResponse | void>;

  info(entries: DmaEntries): Promise<AvApiResponse | void>;

  warn(entries: DmaEntries): Promise<AvApiResponse | void>;

  error(entries: DmaEntries): Promise<AvApiResponse | void>;
}
