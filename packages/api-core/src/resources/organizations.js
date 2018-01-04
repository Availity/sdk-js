import AvApi from '../api';

export default class AvOrganizations extends AvApi {
  constructor(http, promise, avUsers, config = {}) {
    const options = Object.assign(
      {
        path: 'api/sdk/platform',
        name: 'organizations',
      },
      config
    );
    super(http, promise, options);

    if (!avUsers) {
      throw new Error('[avUsers] must be defined and be instance of AvUsers');
    }

    this.avUsers = avUsers;
  }

  queryOrganizations(user, config) {
    const queryConfig = Object.assign({ params: {} }, config);
    queryConfig.params = Object.assign({ userId: user.id }, queryConfig.params);
    return this.query(queryConfig);
  }

  getOrganizations(config) {
    return this.avUsers
      .me()
      .then(user => this.queryOrganizations(user, config));
  }
}
