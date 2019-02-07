import AvApi from '../api';

export default class AvRegions extends AvApi {
  constructor({ http, promise, merge, avUsers, config }) {
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
    this.avUsers = avUsers;
  }

  getRegions(config) {
    if (!this.avUsers || !this.avUsers.me) {
      throw new Error('avUsers must be defined');
    }
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
