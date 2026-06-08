import AvApi from '../api';

export default class AvNavigation extends AvApi {
  constructor(config) {
    const options = {
      path: 'api/sdk/platform',
      name: 'navigation/spaces',
      ...config,
    };
    super(options);
  }
}
