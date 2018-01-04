import axios from 'axios';
import utils from 'axios/lib/utils';
import { AvNavigation } from '@availity/api-core';

const { merge } = utils;
export default new AvNavigation({
  http: axios,
  promise: Promise,
  merge,
});
