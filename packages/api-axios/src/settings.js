import axios from 'axios';
import merge from 'deep-assign';
import { AvSettings } from '@availity/api-core';
import userApi from './user';

export default new AvSettings({
  http: axios,
  promise: Promise,
  merge,
  avUsers: userApi,
});
