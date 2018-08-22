import axios from 'axios';
import merge from 'deep-assign';
import { AvUserPermissions } from '@availity/api-core';
import qs from 'qs';

export default new AvUserPermissions({
  http: axios,
  promise: Promise,
  merge,
  config: {
    paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' }),
  },
});
