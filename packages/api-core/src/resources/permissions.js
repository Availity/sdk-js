import AvApi from '../resource';

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

  getPermissions(id, region) {
    return this.query({
      params: { id, region },
    });
  }
}
