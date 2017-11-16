import axios from 'axios/dist/axios';

import { AvNavigation } from '@availity/api-core';

export class AvNavigationResource extends AvNavigation {
  constructor(options) {
    super(axios, Promise, options);
  }
}
