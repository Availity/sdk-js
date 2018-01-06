import axios from 'axios';
import utils from 'axios/lib/utils';
import { AvOrganizations } from '@availity/api-core';
import avUserApi from './user';

const { merge } = utils;
export default new AvOrganizations({
  http: axios,
  promise: Promise,
  merge,
  avUsers: avUserApi,
});
