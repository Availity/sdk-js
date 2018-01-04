import AvApi from '../api';

export default class AvRegions extends AvApi {
  constructor(http, promise, avUsers, config = {}) {
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
    this.avUsers = avUsers;
  }

  afterUpdate(response) {
    this.setPageBust();
    return response;
  }

  getRegions(config) {
    return this.avUsers.me().then(user => {
      const queryConfig = this.addParams({ userId: user.id }, config);
      return this.query(queryConfig);
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
