import axios from 'axios';
import merge from 'deep-assign';
import { AvSpaces } from '@availity/api-core';

export default new AvSpaces({
  http: axios,
  promise: Promise,
  merge,
});
