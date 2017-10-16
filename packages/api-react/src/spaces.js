import axios from 'axios/dist/axios';

import {AvSpaces} from '@availity/api-core';

export class AvSpacesResource extends AvSpaces {
  constructor(options) {
    super(axios, Promise, options);
  }
}
