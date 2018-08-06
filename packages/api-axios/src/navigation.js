import axios from 'axios';
import merge from 'deep-assign';
import { AvNavigation } from '@availity/api-core';

export default new AvNavigation({
  http: axios,
  promise: Promise,
  merge,
});
