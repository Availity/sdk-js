import AvApi from '../api';

export default class AvOrganizations extends AvApi {
  constructor({ http, promise, merge, avUsers, config }) {
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

    if (!avUsers) {
      throw new Error('[avUsers] must be defined and be instance of avUsers');
    }

    this.avUsers = avUsers;
  }

  queryOrganizations(user, config) {
    const queryConfig = this.addParams({ userId: user.id }, config);
    return this.query(queryConfig);
  }

  getOrganizations(config) {
    return this.avUsers
      .me()
      .then(user => this.queryOrganizations(user, config));
  }
}
