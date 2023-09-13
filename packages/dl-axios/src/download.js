import DownloadMicroservice from '@availity/dl-core';

export default class AvDownloadApi extends DownloadMicroservice {
  constructor({ http, promise, merge, config }) {
    super({
      http,
      promise,
      merge,
      config,
    });
  }
}
