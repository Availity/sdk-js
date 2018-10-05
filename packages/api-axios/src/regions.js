import axios from 'axios';
import merge from 'merge-options-es5';
import { AvRegions } from '@availity/api-core';
import userApi from './user';

export default new AvRegions({
  http: axios,
  promise: Promise,
  merge,
  avUsers: userApi,
});
