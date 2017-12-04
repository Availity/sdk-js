import axios from 'axios/dist/axios';

import { AvNotification } from '@availity/api-core';

export default class AvNotificationResource extends AvNotification {
  constructor(options) {
    super(axios, Promise, options);
  }
}
