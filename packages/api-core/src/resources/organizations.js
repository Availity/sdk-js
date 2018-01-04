import AvApi from '../api';

export default class AvOrganizations extends AvApi {
  constructor({ http, promise, merge, AvUsers, config }) {
    const options = Object.assign(
      {
        path: 'api/sdk/platform',
        name: 'organizations',
      },
      config
    );
    super({
      http,
      promise,
      merge,
      config: options,
    });

    if (!AvUsers) {
      throw new Error('[AvUsers] must be defined and be instance of AvUsers');
    }

    this.AvUsers = AvUsers;
  }

  queryOrganizations(user, config) {
    const queryConfig = this.addParams({ userId: user.id }, config);
    return this.query(queryConfig);
  }

  getOrganizations(config) {
    return this.AvUsers.me().then(user =>
      this.queryOrganizations(user, config)
    );
  }
}
