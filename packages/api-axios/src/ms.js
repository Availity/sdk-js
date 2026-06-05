import axios from 'axios';
import { AvMicroservice } from '@availity/api-core';

export default class AvMicroserviceApi extends AvMicroservice {
  constructor(config) {
    const { http, ...rest } = config;
    super({ http: http || axios, ...rest });
  }
}
