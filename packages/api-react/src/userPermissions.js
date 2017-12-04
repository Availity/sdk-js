import axios from 'axios/dist/axios';

import { AvUserPermissions } from '@availity/api-core';

class AvUserPermissionsApi extends AvUserPermissions {
  constructor(options) {
    super(axios, Promise, options);
  }
}

export default new AvUserPermissionsApi();
