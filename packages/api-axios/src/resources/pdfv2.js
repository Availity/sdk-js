import { AvPdfMicroservice } from '@availity/api-core';
import axios from 'axios';

export default class AvPdfMicroserviceApi extends AvPdfMicroservice {
  constructor(config = {}) {
    const { http, ...rest } = config;
    super({ http: http || axios, ...rest });
  }
}

export const avPdfMicroserviceApi = new AvPdfMicroserviceApi();
