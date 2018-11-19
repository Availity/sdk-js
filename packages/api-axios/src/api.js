import axios from 'axios';
import merge from 'merge-options-es5';
import Api from '@availity/api-core';

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
