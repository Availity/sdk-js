import { AvStash } from '@availity/api-core';
import axios from 'axios';

export default class AvStashApi extends AvStash {
  constructor(config = {}) {
    const { http, ...rest } = config;
    super({ http: http || axios, ...rest });
  }
}

export const avStashApi = new AvStashApi();
