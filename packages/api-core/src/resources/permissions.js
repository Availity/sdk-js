import AvApi from '../api';

export default class AvPermissions extends AvApi {
  constructor(config) {
    const options = {
      path: 'api/sdk/platform',
      name: 'permissions',
      ...config,
    };
    super(options);
  }

  getPermissions(id, region) {
    return this.query({
      params: { id, region },
    });
  }
}
