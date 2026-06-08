import AvApi, { AvApiConfig, RequestConfig, AvApiResponse } from '../api';

export default class AvSpaces extends AvApi {
  constructor(config: AvApiConfig & { http: (config: RequestConfig) => Promise<AvApiResponse> });

  parseSpaceId(query: string): string;

  getSpaceName(spaceId: string): Promise<string>;
}
