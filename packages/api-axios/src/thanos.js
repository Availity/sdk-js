import axios from 'axios';
import merge from 'merge-options-es5';
import { AvThanos } from '@availity/api-core';

export default new AvThanos({
  http: axios,
  promise: Promise,
  merge,
});
