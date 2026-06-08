import AvMicroservice from '../ms';
import { AvApiConfig, RequestConfig, AvApiResponse } from '../api';

export interface TelemetryData {
  telemetryBody?: Record<string, unknown>;
  [key: string]: unknown;
}

export default class AvTelemetry extends AvMicroservice {
  constructor(config: AvApiConfig & { http: (config: RequestConfig) => Promise<AvApiResponse> });

  send(level: string, data: TelemetryData): string;

  debug(data: TelemetryData): Promise<AvApiResponse | void>;

  info(data: TelemetryData): Promise<AvApiResponse | void>;

  warn(data: TelemetryData): Promise<AvApiResponse | void>;

  error(data: TelemetryData): Promise<AvApiResponse | void>;
}
