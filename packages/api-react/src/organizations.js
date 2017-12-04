import axios from 'axios/dist/axios';

import { AvOrganizations } from '@availity/api-core';
import avUserApi from './user';

class AvOrganizationsApi extends AvOrganizations {
  constructor(options) {
    super(axios, Promise, avUserApi, options);
  }
}

export default new AvOrganizationsApi();
