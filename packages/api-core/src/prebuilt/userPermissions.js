import { AvApi } from '../resource';

export class AvUserPermissions extends AvApi {
  constructor(http, promise, config = {}) {
    const thisConfig = Object.assign(
      {
        path: 'api/internal',
        name: 'axi-user-permissions',
      },
      config
    );
    super(http, promise, thisConfig);
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
