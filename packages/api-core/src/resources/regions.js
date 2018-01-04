import AvApi from '../api';

export default class AvRegions extends AvApi {
  constructor({ http, promise, merge, AvUsers, config }) {
    const options = Object.assign(
      {
        path: 'api/sdk/platform',
        name: 'regions',
        sessionBust: false,
        pageBust: true,
      },
      config
    );
    super({
      http,
      promise,
      merge,
      config: options,
    });
    this.AvUsers = AvUsers;
  }

  afterUpdate(response) {
    this.setPageBust();
    return response;
  }

  getRegions(config) {
    return this.AvUsers.me().then(user => {
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
