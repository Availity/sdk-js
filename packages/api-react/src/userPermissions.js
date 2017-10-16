import axios from 'axios/dist/axios';

import {AvUserPermissions} from '@availity/api-core';

export class AvUserPermissionsResource extends AvUserPermissions {
  constructor(options) {
    super(axios, Promise, options);
  }
}
