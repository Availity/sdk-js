import AvApi from '../resource';

export default class AvPermissions extends AvApi {
  constructor(http, promise, config = {}) {
    const options = Object.assign(
      {
        path: 'api/sdk/platform',
        name: 'permissions',
      },
      config
    );
    super(http, promise, options);
  }

  getPermissions(id, region) {
    return this.query({
      params: { id, region },
    });
  }
}
