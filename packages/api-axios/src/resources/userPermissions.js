import qs from 'qs';
import AvApi from '../api';

export default class AvUserPermissionsApi extends AvApi {
  constructor(config) {
    super({
      path: 'api/internal',
      name: 'axi-user-permissions',
      paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' }),
      ...config,
    });
  }

  afterQuery(response) {
    return response?.data?.axiUserPermissions || [];
  }

  async getPermissions(permissionId, region) {
    return this.query({
      params: { permissionId, region },
    });
  }
}

export const avUserPermissionsApi = new AvUserPermissionsApi();
