import axios from 'axios/dist/axios';

import { AvProviders } from '@availity/api-core';

class AvProvidersApi extends AvProviders {
  constructor(options) {
    super(axios, Promise, options);
  }
}

export default new AvProvidersApi();
