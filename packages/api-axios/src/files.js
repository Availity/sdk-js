import axios from 'axios';
import merge from 'deep-assign';
import { AvFiles } from '@availity/api-core';

export default new AvFiles({
  http: axios,
  promise: Promise,
  merge,
});
