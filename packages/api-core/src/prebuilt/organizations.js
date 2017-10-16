import {AvApi} from '../resource';

export class AvOrganizations extends AvApi {
  constructor(http, promise, AvUsers, config = {}) {
    const thisConfig = Object.assign({
      path: 'api/sdk/platform',
      name: 'organizations'
    }, config);
    super(http, promise, thisConfig);

    if (!AvUsers) {
      throw new Error('[AvUsers] must be defined');
    }

    this.AvUsers = AvUsers;
  }
  afterQuery(response) {
    return (response && response.data && response.data.organizations) ? response.data.organizations : [];
  }
  queryOrganizations(user, config) {
    const params = Object.assign({}, {userId: user.id}, config.params || {});
    return this.query(Object.assign({}, { params }, config));
  }
  getOrganizations(config) {
    return this.AvUsers.me()
    .then(user => {
      return this.queryOrganizations(user, config);
    });
  }
}
