import axios from 'axios';
import utils from 'axios/lib/utils';
import { AvRegions } from '@availity/api-core';
import userApi from './user';

const { merge } = utils;
export default new AvRegions({
  http: axios,
  promise: Promise,
  merge,
  AvUsers: userApi,
});
