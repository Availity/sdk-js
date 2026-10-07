import qs from 'qs';
import AvApi from '../api';

const paramsSerializer = (params) => qs.stringify(params, { arrayFormat: 'repeat' });

export default class AvFeatureManagementApi extends AvApi {
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
    return response?.data?.axiUserPermissions || [];
  }

  /**
   * Get user permissions for one or more permission IDs.
   * @param {string|string[]} permissionId
   * @param {string} [region] - Region code (e.g. 'FL', 'ALL')
   */
  async getPermissions(permissionId, region) {
    const cfg = this.userPermissionsConfig({ params: { permissionId, region } });
    cfg.method = 'GET';
    return this.request(cfg, this.afterQuery.bind(this));
  }

  /**
   * Check whether the user has a specific permission with at least one authorized organization.
   * @param {string} permissionId
   * @param {string} [region]
   */
  async hasPermission(permissionId, region) {
    const list = await this.getPermissions(permissionId, region);
    const permissions = Array.isArray(list) ? list : list?.data?.axiUserPermissions || [];
    return permissions.some((p) => p.id === permissionId && p.organizations?.length > 0);
  }

  /**
   * Get all organizations the user is authorized for under a given permission.
   * @param {string} permissionId
   * @param {string} [region]
   */
  async getAuthorizedOrganizations(permissionId, region) {
    const list = await this.getPermissions(permissionId, region);
    const permissions = Array.isArray(list) ? list : list?.data?.axiUserPermissions || [];
    const match = permissions.find((p) => p.id === permissionId);
    return match?.organizations || [];
  }
}

export const avFeatureManagementApi = new AvFeatureManagementApi();
