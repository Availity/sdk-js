import axios from 'axios';
import merge from 'deep-assign';
import { AvProviders } from '@availity/api-core';

export default new AvProviders({
  http: axios,
  promise: Promise,
  merge,
});
