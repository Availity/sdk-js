import axios from 'axios';
import merge from 'merge-options';
import { AvSettings } from '@availity/api-core';
import userApi from './user';

export default new AvSettings({
  http: axios,
  promise: Promise,
  merge,
  avUsers: userApi,
});
