import axios from 'axios/dist/axios';

import { AvSpaces } from '@availity/api-core';

class AvSpacesApi extends AvSpaces {
  constructor(options) {
    super(axios, Promise, options);
  }
}

export default new AvSpacesApi();
