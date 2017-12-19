import AvApi from '../resource';

export default class AvUsers extends AvApi {
  constructor(http, promise, config = {}) {
    const options = Object.assign(
      {
        path: 'api/sdk/platform',
        name: 'users',
      },
      config
    );
    super(http, promise, options);
  }

  me(config) {
    return this.get('me', config).then(response => response.data);
  }
}
