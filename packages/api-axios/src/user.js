import axios from 'axios';
import merge from 'deep-assign';
import { AvUsers } from '@availity/api-core';

export default new AvUsers({
  http: axios,
  promise: Promise,
  merge,
});
