import axios from 'axios/dist/axios';

import { AvRegions } from '@availity/api-core';

export default class AvRegionsResource extends AvRegions {
  constructor(AvUsersResource, options) {
    super(axios, Promise, AvUsersResource, options);
  }
}
