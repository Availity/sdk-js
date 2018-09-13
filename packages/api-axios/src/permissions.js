import axios from 'axios';
import merge from 'merge-options';
import { AvPermissions } from '@availity/api-core';

export default new AvPermissions({
  http: axios,
  promise: Promise,
  merge,
});
