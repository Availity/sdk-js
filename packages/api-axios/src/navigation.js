import axios from 'axios';
import merge from 'merge-options-es5';
import { AvNavigation } from '@availity/api-core';

export default new AvNavigation({
  http: axios,
  promise: Promise,
  merge,
});
