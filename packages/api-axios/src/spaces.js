import axios from 'axios';
import merge from 'merge-options-es5';
import { AvSpaces } from '@availity/api-core';

export default new AvSpaces({
  http: axios,
  promise: Promise,
  merge,
});
