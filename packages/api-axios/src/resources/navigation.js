import AvApi from '../api';

export default class AvNavigationApi extends AvApi {
  constructor(config) {
    super({
      path: 'api/sdk/platform',
      name: 'navigation/spaces',
      ...config,
    });
  }
}

export const avNavigationApi = new AvNavigationApi();
