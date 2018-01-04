import AvApi from '../api';

export default class AvNavigation extends AvApi {
  constructor(http, promise, merge, config = {}) {
    const options = Object.assign(
      {
        path: 'api/sdk/platform',
        name: 'navigation/spaces',
      },
      config
    );
    super(http, promise, merge, options);
  }
}
