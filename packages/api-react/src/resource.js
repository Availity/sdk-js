import axios from 'axios/dist/axios';

import Api from '@availity/api-core';

export default class AvApi extends Api {
  constructor(options) {
    super(axios, Promise, options);
  }
}
