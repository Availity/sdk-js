import axios from 'axios';
import { deepMerge } from '@availity/api-core';
import DownloadMicroservice from '@availity/dl-core';

export default class AvDownloadApi extends DownloadMicroservice {
  constructor(options) {
    super({
      http: axios,
      promise: Promise,
      merge: deepMerge,
      config: options,
    });
  }
}
