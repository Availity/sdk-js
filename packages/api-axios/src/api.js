import axios from 'axios';
import utils from 'axios/lib/utils';
import Api from '@availity/api-core';

const { merge } = utils;

export default class AvApi extends Api {
  constructor(options) {
    super({
      http: axios,
      promise: Promise,
      merge,
      config: options,
    });
  }
}
