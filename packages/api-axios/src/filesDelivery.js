import axios from 'axios';
import merge from 'merge-options-es5';
import { AvFilesDelivery } from '@availity/api-core';

export default new AvFilesDelivery({
  http: axios,
  promise: Promise,
  merge,
});
