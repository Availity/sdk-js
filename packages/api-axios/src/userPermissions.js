import axios from 'axios';
import merge from 'merge-options';
import { AvUserPermissions } from '@availity/api-core';

export default new AvUserPermissions({
  http: axios,
  promise: Promise,
  merge,
});
