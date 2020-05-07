import axios from 'axios';
import merge from 'merge-options-es5';
import { AvOrganizations } from '@availity/api-core';
import avUserApi from './user';
import avUserPermissionsApi from './userPermissions';

export default new AvOrganizations({
  http: axios,
  promise: Promise,
  merge,
  avUsers: avUserApi,
  avUserPermissions: avUserPermissionsApi,
});
