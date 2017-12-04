import axios from 'axios/dist/axios';

import AvApi from '@availity/api-core';

export default class AvApiResource extends AvApi {
  constructor(options) {
    super(axios, Promise, options);
  }
}
