import { AvTelemetry } from '@availity/api-core';
import axios from 'axios';

export default class AvTelemetryApi extends AvTelemetry {
  constructor(config = {}) {
    const { http, ...rest } = config;
    super({ http: http || axios, ...rest });
  }
}

export const avTelemetryApi = new AvTelemetryApi();
