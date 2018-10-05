import axios from 'axios';
import merge from 'merge-options-es5';
import { AvPermissions } from '@availity/api-core';

export default new AvPermissions({
  http: axios,
  promise: Promise,
  merge,
});
