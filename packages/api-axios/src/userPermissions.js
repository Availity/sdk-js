import axios from 'axios';
import merge from 'merge-options-es5';
import { AvUserPermissions } from '@availity/api-core';

export default new AvUserPermissions({
  http: axios,
  promise: Promise,
  merge,
});
