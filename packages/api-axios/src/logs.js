import axios from 'axios';
import merge from 'deep-assign';
import { AvLogMessages } from '@availity/api-core';

export default new AvLogMessages({
  http: axios,
  promise: Promise,
  merge,
});
