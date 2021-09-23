import AvApi from '../api';

export default class AvUserApi extends AvApi {
  constructor(config) {
    super({
      path: 'api/sdk/platform',
      name: 'users',
      ...config,
    });
  }

  async me(config) {
    const response = await this.get('me', config);
    return response.data;
  }
}

export const avUserApi = new AvUserApi();
