import axios from 'axios/dist/axios';

import { AvNotification } from '@availity/api-core';

class AvNotificationApi extends AvNotification {
  constructor(options) {
    super(axios, Promise, options);
  }
}

export default new AvNotificationApi();
