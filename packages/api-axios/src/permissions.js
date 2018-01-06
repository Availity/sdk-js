import axios from 'axios';
import utils from 'axios/lib/utils';
import { AvPermissions } from '@availity/api-core';

const { merge } = utils;
export default new AvPermissions({
  http: axios,
  promise: Promise,
  merge,
});
