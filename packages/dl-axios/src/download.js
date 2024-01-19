import axios from 'axios';
import merge from 'lodash/merge';
import DownloadMicroservice from '@availity/dl-core';

export default class AvDownloadApi extends DownloadMicroservice {
  constructor(options) {
    super({
      http: axios,
      promise: Promise,
      merge,
      config: options,
    });
  }
}
