import { AvRouteConfigurations } from '@availity/api-core';
import axios from 'axios';

export default class AvRouteConfigurationsApi extends AvRouteConfigurations {
  constructor(config = {}) {
    const { http, ...rest } = config;
    super({ http: http || axios, ...rest });
  }
}

export const avRouteConfigurationsApi = new AvRouteConfigurationsApi();
