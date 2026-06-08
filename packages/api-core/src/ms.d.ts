import AvApi, { AvApiConfig } from './api';

export default class AvMicroservice extends AvApi {
  /** Build URL from config — merges defaults before constructing */
  getUrl(config: Partial<AvApiConfig>, id?: string): string;

  /** Returns the microservice URL from response config (used for polling) */
  getLocation(response: { config: Partial<AvApiConfig> }): string;
}
