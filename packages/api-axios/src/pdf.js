import axios from 'axios';
import utils from 'axios/lib/utils';
import { AvPdf } from '@availity/api-core';

const { merge } = utils;
export default new AvPdf({
  http: axios,
  promise: Promise,
  merge,
});
