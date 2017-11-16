import axios from 'axios/dist/axios';

import { AvOrganizations } from '@availity/api-core';

export default class AvOrganizationsResource extends AvOrganizations {
  constructor(AvUsersResource, options) {
    super(axios, Promise, AvUsersResource, options);
  }
}
