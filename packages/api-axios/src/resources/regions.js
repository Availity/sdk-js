import AvCloudApi from '../api';
import { avUserApi } from './user';

export default class AvRegionsApi extends AvCloudApi {
  constructor(config) {
    super({
      path: '/appl/customer-management/legacy/sdk/platform',
      name: 'regions',
      sessionBust: false,
      pageBust: true,
      ...config,
    });
  }

  getQueryResultKey() {
    return 'regions';
  }

  afterUpdate = (response) => {
    this.setPageBust();
    return response;
  };

  async getRegions(config) {
    if (config?.params?.userId) {
      return this.query(config);
    }

    const user = await avUserApi.me();
    const queryConfig = this.addParams({ userId: user.id }, config);

    return this.query(queryConfig);
  }

  async getCurrentRegion() {
    return this.query({
      params: {
        currentlySelected: true,
      },
    });
  }
}

export const avRegionsApi = new AvRegionsApi();
