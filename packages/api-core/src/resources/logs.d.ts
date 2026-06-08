import AvApi, { AvApiConfig, RequestConfig, AvApiResponse } from '../api';

export interface LogEntries {
  [key: string]: unknown;
}

export default class AvLogMessages extends AvApi {
  constructor(config: AvApiConfig & { http: (config: RequestConfig) => Promise<AvApiResponse> });

  send(level: string, entries: LogEntries): string;

  debug(entries: LogEntries): Promise<AvApiResponse | void>;

  info(entries: LogEntries): Promise<AvApiResponse | void>;

  warn(entries: LogEntries): Promise<AvApiResponse | void>;

  error(entries: LogEntries): Promise<AvApiResponse | void>;
}
