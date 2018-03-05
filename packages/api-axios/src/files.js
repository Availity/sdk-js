import axios from 'axios';
import utils from 'axios/lib/utils';
import { AvFiles } from '@availity/api-core';

const { merge } = utils;

export default new AvFiles({
  http: axios,
  promise: Promise,
  merge,
});
