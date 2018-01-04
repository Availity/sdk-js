import axios from 'axios';
import utils from 'axios/lib/utils';
import { AvProviders } from '@availity/api-core';

const { merge } = utils;
export default new AvProviders({
  http: axios,
  promise: Promise,
  merge,
});
