import axios from 'axios';
import merge from 'merge-options';
import { AvPdf } from '@availity/api-core';

export default new AvPdf({
  http: axios,
  promise: Promise,
  merge,
});
