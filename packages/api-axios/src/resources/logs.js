import { AvLogMessages } from '@availity/api-core';
import axios from 'axios';

export default class AvLogMessagesApi extends AvLogMessages {
  constructor(config = {}) {
    const { http, ...rest } = config;
    super({ http: http || axios, ...rest });
  }
}

export const avLogMessagesApi = new AvLogMessagesApi();
