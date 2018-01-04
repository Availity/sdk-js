import axios from 'axios';
import utils from 'axios/lib/utils';
import { AvUsers } from '@availity/api-core';

const { merge } = utils;
export default new AvUsers({
  http: axios,
  promise: Promise,
  merge,
});
