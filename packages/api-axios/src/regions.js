import axios from 'axios';
import { AvRegions } from '@availity/api-core';
import userApi from './user';

export default new AvRegions(axios, Promise, userApi);
