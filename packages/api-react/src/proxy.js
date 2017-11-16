import axios from 'axios/dist/axios';

import { AvProxy } from '@availity/api-core';

export default class AvProxyResource extends AvProxy {
  constructor(options) {
    super(axios, Promise, options);
  }
}
