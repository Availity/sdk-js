import { AvMicroservice, AvApiConfig, AvApiResponse, RequestConfig } from '@availity/api-core';

export interface DownloadMicroserviceOptions {
  http: (config: RequestConfig) => Promise<AvApiResponse>;
  promise?: PromiseConstructor;
  merge?: (...args: unknown[]) => unknown;
  config: Partial<AvApiConfig> & { clientId: string };
}

declare class DownloadMicroservice extends AvMicroservice {
  constructor(options: DownloadMicroserviceOptions);

  getAttachment<T = unknown>(config?: Partial<AvApiConfig>): Promise<AvApiResponse<T>>;

  downloadAttachment(data: Blob | string, filename: string, mime?: string): void;
}

export default DownloadMicroservice;
