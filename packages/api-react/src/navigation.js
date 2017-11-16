import axios from 'axios/dist/axios';

import { AvNavigation } from '@availity/api-core';

export default class AvNavigationResource extends AvNavigation {
  constructor(options) {
    super(axios, Promise, options);
  }
}
