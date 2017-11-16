import axios from 'axios/dist/axios';

import { AvPermissions } from '@availity/api-core';

export class AvPermissionsResource extends AvPermissions {
  constructor(options) {
    super(axios, Promise, options);
  }
}
