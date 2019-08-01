import axios from 'axios';
import merge from 'merge-options-es5';
import { AvWebQL } from '@availity/api-core';

export default new AvWebQL({
  http: axios,
  promise: Promise,
  merge,
});
