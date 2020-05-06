import axios from 'axios';
import merge from 'merge-options-es5';
import { AvFilteredOrganizations } from '@availity/api-core';
import avOrganizationsApi from './organizations';
import avUserPermissionsApi from './userPermissions';

export default new AvFilteredOrganizations({
  http: axios,
  promise: Promise,
  merge,
  avOrganizations: avOrganizationsApi,
  avUserPermissions: avUserPermissionsApi,
});
