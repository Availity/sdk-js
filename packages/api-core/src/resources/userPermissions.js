import qs from 'qs';
import AvApi from '../api';

export default class AvUserPermissions extends AvApi {
  constructor({ http, promise, merge, config }) {
    const options = Object.assign(
      {
        path: 'api/internal',
        name: 'axi-user-permissions',
        paramsSerializer: params =>
          qs.stringify(params, { arrayFormat: 'repeat' }),
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

  getPermissions(permissionId, region) {
    return this.query({
      params: { permissionId, region },
    });
  }
}
