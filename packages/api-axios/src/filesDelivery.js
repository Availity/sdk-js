import axios from 'axios';
import utils from 'axios/lib/utils';
import { AvFilesDelivery } from '@availity/api-core';

const { merge } = utils;

export default new AvFilesDelivery({
  http: axios,
  promise: Promise,
  merge,
});
