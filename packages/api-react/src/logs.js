import axios from 'axios/dist/axios';

import { AvLogMessages } from '@availity/api-core';

class AvLogMessagesApi extends AvLogMessages {
  constructor(options) {
    super(axios, Promise, options);
  }
}

export default new AvLogMessagesApi();
