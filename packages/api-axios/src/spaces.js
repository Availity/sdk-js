import axios from 'axios';
import merge from 'merge-options';
import { AvSpaces } from '@availity/api-core';

export default new AvSpaces({
  http: axios,
  promise: Promise,
  merge,
});
