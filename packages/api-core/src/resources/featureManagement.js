import qs from 'qs';
import AvApi from '../api';

const paramsSerializer = (params) => qs.stringify(params, { arrayFormat: 'repeat' });

export default class AvFeatureManagement extends AvApi {
  constructor(config) {
    super({
      path: 'cloud/web/appl/feature-management',
      version: '',
      ...config,
    });
  }

  userPermissionsConfig(extraConfig = {}) {
    const cfg = this.config({ ...extraConfig, name: 'legacy/v1/user-permissions', paramsSerializer });
    cfg.url = this.getUrl(cfg);
    return cfg;
  }

  afterQuery(response) {
    return response && response.data && response.data.axiUserPermissions ? response.data.axiUserPermissions : [];
  }

  getPermissions(permissionId, region) {
    const cfg = this.userPermissionsConfig({ params: { permissionId, region } });
    cfg.method = 'GET';
    return this.request(cfg, this.afterQuery.bind(this));
  }

  hasPermission(permissionId, region) {
    return this.getPermissions(permissionId, region).then((list) => {
      const permissions = Array.isArray(list) ? list : list?.data?.axiUserPermissions || [];
      return permissions.some((p) => p.id === permissionId && p.organizations?.length > 0);
    });
  }

  getAuthorizedOrganizations(permissionId, region) {
    return this.getPermissions(permissionId, region).then((list) => {
      const permissions = Array.isArray(list) ? list : list?.data?.axiUserPermissions || [];
      const match = permissions.find((p) => p.id === permissionId);
      return match?.organizations || [];
    });
  }
}
