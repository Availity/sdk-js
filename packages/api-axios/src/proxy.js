import axios from 'axios';
import merge from 'merge-options';
import { AvProxy } from '@availity/api-core';

export default class AvProxyApi extends AvProxy {
  constructor(options) {
    super({
      http: axios,
      promise: Promise,
      merge,
      config: options,
    });
  }
}
