import axios from 'axios';
import merge from 'merge-options-es5';
import { AvDisclaimers } from '@availity/api-core';

export default new AvDisclaimers({
  http: axios,
  promise: Promise,
  merge,
});
