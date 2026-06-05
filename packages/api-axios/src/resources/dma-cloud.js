import { AvLogMessagesV3 as AvLogMessagesApiV3Core } from '@availity/api-core';
import axios from 'axios';

export default class AvLogMessagesApiV3 extends AvLogMessagesApiV3Core {
  constructor(config = {}) {
    const { http, ...rest } = config;
    super({ http: http || axios, ...rest });
  }
}

export const avLogMessagesApiV3 = new AvLogMessagesApiV3();
