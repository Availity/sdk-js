import AvApi from '../api';

export default class AvUserPermissions extends AvApi {
  constructor(http, promise, config = {}) {
    const options = Object.assign(
      {
        path: 'api/internal',
        name: 'axi-user-permissions',
      },
      config
    );
    super(http, promise, options);
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
