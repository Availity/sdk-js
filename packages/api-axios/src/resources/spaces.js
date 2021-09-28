import AvApi from '../api';

export default class AvSpacesApi extends AvApi {
  constructor(config) {
    super({
      path: 'api/sdk/platform',
      name: 'spaces',
      ...config,
    });
  }

  parseSpaceId(query) {
    const pairs = query.substr(1).split('&');

    let spaceId = '';

    if (Array.isArray(pairs)) {
      for (const item of pairs) {
        const pair = item.split('=');
        const key = pair[0];
        if (key === 'spaceId') {
          spaceId = pair[1] && decodeURIComponent(pair[1]);
        }
      }
    }

    return spaceId;
  }

  async getSpaceName(spaceId) {
    if (!spaceId) {
      throw new Error('[spaceId] must be defined');
    }
    const response = await this.get(spaceId);
    return response.data.name;
  }
}

export const avSpacesApi = new AvSpacesApi();
