import axios from 'axios/dist/axios';

import { AvUsers } from '@availity/api-core';

class AvUsersApi extends AvUsers {
  constructor(options) {
    super(axios, Promise, options);
  }
}

export default new AvUsersApi();
