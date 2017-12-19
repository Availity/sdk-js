import AvApi from '../resource';

export default class AvUsers extends AvApi {
  constructor(http, promise, config = {}) {
    const thisConfig = Object.assign(
      {
        path: 'api/sdk/platform',
        name: 'users',
      },
      config
    );
    super(http, promise, thisConfig);
  }

  me(config) {
    return this.get('me', config);
  }
}
