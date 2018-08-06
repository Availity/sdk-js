import axios from 'axios';
import merge from 'deep-assign';
import { AvPdf } from '@availity/api-core';

export default new AvPdf({
  http: axios,
  promise: Promise,
  merge,
});
