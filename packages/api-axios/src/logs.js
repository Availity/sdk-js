import axios from 'axios';
import utils from 'axios/lib/utils';
import { AvLogMessages } from '@availity/api-core';

const { merge } = utils;

export default new AvLogMessages(axios, Promise, merge);
