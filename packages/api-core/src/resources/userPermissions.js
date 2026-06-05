import qs from 'qs';
import AvApi from '../api';

export default class AvUserPermissions extends AvApi {
  constructor(config) {
    const options = {
      path: 'api/internal',
      name: 'axi-user-permissions',
      paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' }),
      ...config,
    };
    super(options);
  }

  afterQuery(response) {
    return response && response.data && response.data.axiUserPermissions ? response.data.axiUserPermissions : [];
  }

  getPermissions(permissionId, region) {
    return this.query({
      params: { permissionId, region },
    });
  }
}
