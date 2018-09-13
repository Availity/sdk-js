import axios from 'axios';
import merge from 'merge-options';
import { AvLogMessages } from '@availity/api-core';

export default new AvLogMessages({
  http: axios,
  promise: Promise,
  merge,
});
