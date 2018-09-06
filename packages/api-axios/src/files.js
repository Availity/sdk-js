import axios from 'axios';
import merge from 'merge-options';
import { AvFiles } from '@availity/api-core';

export default new AvFiles({
  http: axios,
  promise: Promise,
  merge,
});
