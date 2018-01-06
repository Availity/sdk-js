import AvApi from '../api';

export default class AvUserPermissions extends AvApi {
  constructor({ http, promise, merge, config }) {
    const options = Object.assign(
      {
        path: 'api/internal',
        name: 'axi-user-permissions',
      },
      config
    );
    super({
      http,
      promise,
      merge,
      config: options,
    });
  }

  afterQuery(response) {
    return response && response.data && response.data.axiUserPermissions
      ? response.data.axiUserPermissions
      : [];
  }

  getPermissions(permissionId, region) {
    return this.query({
      params: { permissionId, region },
    });
  }
}
