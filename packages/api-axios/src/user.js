import axios from 'axios';
import merge from 'merge-options-es5';
import { AvUsers } from '@availity/api-core';

export default new AvUsers({
  http: axios,
  promise: Promise,
  merge,
});
