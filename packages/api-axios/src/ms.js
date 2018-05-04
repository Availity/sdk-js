import axios from 'axios';
import utils from 'axios/lib/utils';
import { AvMicroservice } from '@availity/api-core';

const { merge } = utils;

export default class AvMicroserviceApi extends AvMicroservice {
  constructor(options) {
    super({
      http: axios,
      promise: Promise,
      merge,
      config: options,
    });
  }
}
