import axios from 'axios';
import merge from 'merge-options-es5';
import { AvLogMessagesV2 } from '@availity/api-core';

export default new AvLogMessagesV2({
  http: axios,
  promise: Promise,
  merge,
});
