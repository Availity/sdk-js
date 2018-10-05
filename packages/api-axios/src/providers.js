import axios from 'axios';
import merge from 'merge-options-es5';
import { AvProviders } from '@availity/api-core';

export default new AvProviders({
  http: axios,
  promise: Promise,
  merge,
});
