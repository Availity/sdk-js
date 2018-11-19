import axios from 'axios';
import merge from 'merge-options-es5';
import { AvPdf } from '@availity/api-core';

export default new AvPdf({
  http: axios,
  promise: Promise,
  merge,
});
