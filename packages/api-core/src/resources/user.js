import AvApi from '../api';

export default class AvUsers extends AvApi {
  constructor(config) {
    const options = {
      path: 'api/sdk/platform',
      name: 'users',
      ...config,
    };
    super(options);
  }

  me(config) {
    return this.get('me', config).then((response) => response.data);
  }
}
