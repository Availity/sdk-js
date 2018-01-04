import axios from 'axios';
import utils from 'axios/lib/utils';
import { AvUserPermissions } from '@availity/api-core';

const { merge } = utils;
export default new AvUserPermissions({
  http: axios,
  promise: Promise,
  merge,
});
