/* eslint-disable @typescript-eslint/no-explicit-any */
import { AvMicroservice } from '@availity/api-core';

declare class DownloadMicroservice extends AvMicroservice {
  constructor({ http, promise, merge, config });

  getAttachment(config: any): any;

  downloadAttachment(data: any, filename: any, mime: any): void;
}

export default DownloadMicroservice;
