import axios from 'axios';
import merge from 'deep-assign';
import { AvPermissions } from '@availity/api-core';

export default new AvPermissions({
  http: axios,
  promise: Promise,
  merge,
});
