import axios from 'axios';

import Api from '@availity/api-core';

export default class AvApi extends Api {
  constructor(options) {
    super(axios, Promise, options);
  }
}
