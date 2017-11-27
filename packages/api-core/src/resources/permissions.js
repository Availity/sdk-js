import { AvApi } from '../resource';

export default class AvPermissions extends AvApi {
  constructor(http, promise, config = {}) {
    const thisConfig = Object.assign(
      {
        path: 'api/sdk/platform',
        name: 'permissions',
      },
      config
    );
    super(http, promise, thisConfig);
  }
  afterQuery(response) {
    return response && response.data && response.data.permissions
      ? response.data.permissions
      : [];
  }
  getPermissions(id, region) {
    return this.query({
      params: { id, region },
    });
  }
}
