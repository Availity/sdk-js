import AvApi from '../resource';

export default class AvRegions extends AvApi {
  constructor(http, promise, AvUsers, config = {}) {
    const thisConfig = Object.assign(
      {
        path: 'api/sdk/platform',
        name: 'regions',
        sessionBust: false,
        pageBust: true,
      },
      config
    );
    super(http, promise, thisConfig);
    this.AvUsers = AvUsers;
  }

  afterGet(response) {
    return response && response.data && response.data.regions
      ? response.data.regions
      : [];
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
