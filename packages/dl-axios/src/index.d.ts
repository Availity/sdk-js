import DownloadMicroservice from '@availity/dl-core';
import { AvApiConfig } from '@availity/api-core';

export type { DownloadMicroserviceOptions } from '@availity/dl-core';

declare class AvDownloadApi extends DownloadMicroservice {
  constructor(options?: Partial<AvApiConfig> & { clientId: string });
}

export default AvDownloadApi;
