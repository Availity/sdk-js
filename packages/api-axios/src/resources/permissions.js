import AvApi from '../api';

export default class AvPermissionsApi extends AvApi {
  constructor(config) {
    super({
      path: 'api/sdk/platform',
      name: 'permissions',
      ...config,
    });
  }

  async getPermissions(id, region) {
    return this.query({
      params: { id, region },
    });
  }
}

export const avPermissionsApi = new AvPermissionsApi();
