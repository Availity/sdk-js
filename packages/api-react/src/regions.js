import axios from 'axios/dist/axios';

import { AvRegions } from '@availity/api-core';

class AvRegionsApi extends AvRegions {
  constructor(AvUsersApi, options) {
    super(axios, Promise, AvUsersApi, options);
  }
}

export default new AvRegionsApi();
