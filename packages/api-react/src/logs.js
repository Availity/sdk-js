import axios from 'axios/dist/axios';

import { AvLogMessages } from '@availity/api-core';

export default class AvLogMessagesResource extends AvLogMessages {
  constructor(options) {
    super(axios, Promise, options);
  }
}
