import axios from 'axios';
import merge from 'merge-options-es5';
import { AvLogMessages } from '@availity/api-core';

export default new AvLogMessages({
  http: axios,
  promise: Promise,
  merge,
});
