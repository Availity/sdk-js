import axios from 'axios/dist/axios';

import { AvNavigation } from '@availity/api-core';

class AvNavigationApi extends AvNavigation {
  constructor(options) {
    super(axios, Promise, options);
  }
}

export default new AvNavigationApi();
