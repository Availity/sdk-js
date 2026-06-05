import AvApi from '../api';

export default class AvUserApi extends AvApi {
  constructor(config) {
    super({
      path: 'cloud/web/appl/user-management/legacy/sdk/platform',
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
