import axios from 'axios';
import merge from 'deep-assign';
import { AvOrganizations } from '@availity/api-core';
import avUserApi from './user';

export default new AvOrganizations({
  http: axios,
  promise: Promise,
  merge,
  avUsers: avUserApi,
});
