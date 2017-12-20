import AvApi from '../resource';

export default class AvRegions extends AvApi {
  constructor(http, promise, AvUsers, config = {}) {
    const options = Object.assign(
      {
        path: 'api/sdk/platform',
        name: 'regions',
        sessionBust: false,
        pageBust: true,
      },
      config
    );
    super(http, promise, options);
    this.AvUsers = AvUsers;
  }

  afterUpdate(response) {
    this.setPageBust();
    return response;
  }

  getRegions(config) {
    return this.AvUsers.me().then(user => {
      config.params = config.params || {};
      config.params.userId = config.params.userId || user.id;
      return this.query(config);
    });
  }

  getCurrentRegion() {
    return this.query({
      params: {
        currentlySelected: true,
      },
    });
  }
}
