import axios from 'axios/dist/axios';

import { AvProviders } from '@availity/api-core';

export class AvProvidersResource extends AvProviders {
  constructor(options) {
    super(axios, Promise, options);
  }
}
