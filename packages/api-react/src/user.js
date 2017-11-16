import axios from 'axios/dist/axios';

import { AvUsers } from '@availity/api-core';

export default class AvUsersResource extends AvUsers {
  constructor(options) {
    super(axios, Promise, options);
  }
}
