import AvApi from '../api';

export default class AvNavigation extends AvApi {
  constructor(http, promise, config = {}) {
    const options = Object.assign(
      {
        path: 'api/sdk/platform',
        name: 'navigation/spaces',
      },
      config
    );
    super(http, promise, options);
  }
}
