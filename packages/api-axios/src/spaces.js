import axios from 'axios';
import utils from 'axios/lib/utils';
import { AvSpaces } from '@availity/api-core';

const { merge } = utils;
export default new AvSpaces(axios, Promise, merge);
