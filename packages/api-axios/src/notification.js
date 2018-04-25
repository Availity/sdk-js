import axios from 'axios';
import utils from 'axios/lib/utils';
import { AvNotification } from '@availity/api-core';

const { merge } = utils;

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
