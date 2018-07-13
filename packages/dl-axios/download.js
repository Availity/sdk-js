import axios from 'axios';
import utils from 'axios/lib/utils';
import DownloadMicroservice from '@availity/dl-core';

const { merge } = utils;

class AvDownloadApi extends DownloadMicroservice {
  constructor(options) {
    super({
      http: axios,
      promise: Promise,
      merge,
      config: options,
    });
  }
}

export default new AvDownloadApi();
