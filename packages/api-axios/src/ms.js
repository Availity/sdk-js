import axios from 'axios';
import merge from 'merge-options-es5';
import { AvMicroservice } from '@availity/api-core';

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
