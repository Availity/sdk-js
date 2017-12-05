import axios from 'axios/dist/axios';

import { AvOrganizations } from '@availity/api-core';
import avUserApi from './user';

export default new AvOrganizations(axios, Promise, avUserApi);
