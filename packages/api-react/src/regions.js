import axios from 'axios/dist/axios';

import {AvRegions} from '@availity/api-core';

export class AvRegionsResource extends AvRegions {
  constructor(AvUsersResource, options) {
    super(axios, Promise, AvUsersResource, options);
  }
}
