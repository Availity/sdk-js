import axios from 'axios';
import merge from 'merge-options';
import { AvNotification } from '@availity/api-core';

class AvNotificationApi extends AvNotification {
  constructor(options) {
    super({
      http: axios,
      promise: Promise,
      merge,
      config: options,
    });
  }
}

export default new AvNotificationApi();
