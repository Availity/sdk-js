import axios from 'axios';
import merge from 'deep-assign';
import { AvUserPermissions } from '@availity/api-core';

export default new AvUserPermissions({
  http: axios,
  promise: Promise,
  merge,
});
