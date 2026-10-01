import { AvMicroservice } from '@availity/api-core';
import fileDownload from 'js-file-download';

export default class DownloadMicroservice extends AvMicroservice {
  constructor({ http, promise, merge, config }) {
    if (!config.clientId) {
      throw new Error('[config.clientId] must be defined');
    }

    const { clientId, ...rest } = config;

    // Spread headers and responseType at the top level so deepMerge inside
    // AvMicroservice merges them into defaultConfig.headers rather than
    // nesting them under defaultConfig.config.
    super({
      http,
      promise,
      merge,
      headers: { 'X-Client-ID': clientId },
      responseType: 'blob',
      ...rest,
    });
  }

  getAttachment(config) {
    return this.query(config);
  }

  downloadAttachment(data, filename, mime) {
    fileDownload(data, filename, mime);
  }
}
