import axios from 'axios/dist/axios';

import { AvPermissions } from '@availity/api-core';

class AvPermissionsApi extends AvPermissions {
  constructor(options) {
    super(axios, Promise, options);
  }
}

export default new AvPermissionsApi();
