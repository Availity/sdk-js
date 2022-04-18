import { AvMicroservice } from '@availity/api-core';
import fileDownload from 'js-file-download';

export default class DownloadMicroservice extends AvMicroservice {
  constructor({ http, promise, merge, config }) {
    if (!config.clientId) {
      throw new Error('[config.clientId] must be defined');
    }

    const options = {
      headers: { 'X-Client-ID': config.clientId },
      responseType: 'blob',
      ...config,
    };
    super({ http, promise, merge, config: options });
  }

  getAttachment(config) {
    return this.query(config);
  }

  downloadAttachment(data, filename, mime) {
    fileDownload(data, filename, mime);
  }
}
