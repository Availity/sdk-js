import { AvLogMessagesV2 as AvLogMessagesApiV2Core } from '@availity/api-core';
import axios from 'axios';

export default class AvLogMessagesApiV2 extends AvLogMessagesApiV2Core {
  constructor(config = {}) {
    const { http, ...rest } = config;
    super({ http: http || axios, ...rest });
  }
}

export const avLogMessagesApiV2 = new AvLogMessagesApiV2();
