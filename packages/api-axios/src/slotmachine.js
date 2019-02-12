import axios from 'axios';
import merge from 'merge-options-es5';
import { AvSlotMachine } from '@availity/api-core';

export default new AvSlotMachine({
  http: axios,
  promise: Promise,
  merge,
});
