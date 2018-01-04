import axios from 'axios';
import utils from 'axios/lib/utils';
import { AvProxy } from '@availity/api-core';

const { merge } = utils;
export default class AvProxyApi extends AvProxy {
  constructor(options) {
    super(axios, Promise, merge, options);
  }
}
