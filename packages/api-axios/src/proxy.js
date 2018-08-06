import axios from 'axios';
import merge from 'deep-assign';
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
