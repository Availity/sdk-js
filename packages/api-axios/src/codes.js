import axios from 'axios';
import merge from 'merge-options-es5';
import { AvCodes } from '@availity/api-core';

export default new AvCodes({
  http: axios,
  promise: Promise,
  merge,
});
