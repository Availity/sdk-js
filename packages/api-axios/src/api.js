import axios from 'axios';
import AvApiCore from '@availity/api-core';

export default class AvApi extends AvApiCore {
  constructor(config) {
    if (!config) throw new Error('[config] must be defined');
    const { http, ...rest } = config;
    super({ http: http || axios, ...rest });
  }
}
