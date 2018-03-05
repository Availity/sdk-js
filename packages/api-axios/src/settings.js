import axios from 'axios';
import utils from 'axios/lib/utils';
import { AvSettings } from '@availity/api-core';

const { merge } = utils;

export default new AvSettings({
  http: axios,
  promise: Promise,
  merge,
});
