import AvApi from '../api';

export default class AvCustomerManagementApi extends AvApi {
  constructor(config) {
    super({
      path: 'cloud/web/appl/customer-management',
      version: '',
      ...config,
    });
  }

  orgsConfig(id = '', extraConfig = {}) {
    const cfg = this.config({ ...extraConfig, name: 'legacy/v1/organizations' });
    cfg.url = this.getUrl(cfg, id);
    return cfg;
  }

  regionsConfig(id = '', extraConfig = {}) {
    const cfg = this.config({ ...extraConfig, name: 'legacy/sdk/platform/v1/regions' });
    cfg.url = this.getUrl(cfg, id);
    return cfg;
  }

  // --- Organizations ---

  /**
   * Get a single organization by its numeric customer ID.
   * Returns `{ status, organization }`.
   * @param {string|number} customerId
   */
  async getOrganization(customerId) {
    const cfg = this.orgsConfig(customerId);
    cfg.method = 'GET';
    return this.request(cfg, this.afterGet);
  }

  /**
   * Query organizations with optional filter params (e.g. customerId, name).
   * @param {object} [config]
   */
  async getOrganizations(config) {
    const cfg = this.orgsConfig('', config);
    cfg.method = 'GET';
    return this.request(cfg, this.afterQuery);
  }

  /**
   * Get a single organization and return just the organization object (unwrapped).
   * @param {string|number} customerId
   */
  async getOrganizationData(customerId) {
    const response = await this.getOrganization(customerId);
    return response?.data?.organization;
  }

  /**
   * Search organizations by customer name.
   * @param {string} name
   * @param {object} [config]
   */
  async searchByName(name, config) {
    return this.getOrganizations({
      ...config,
      params: { name, ...config?.params },
    });
  }

  /**
   * Search organizations by tax ID.
   * @param {string} taxId
   * @param {object} [config]
   */
  async searchByTaxId(taxId, config) {
    return this.getOrganizations({
      ...config,
      params: { taxId, ...config?.params },
    });
  }

  // --- Regions ---

  /**
   * Get all regions. Supports optional params: { sortBy, sortDirection }.
   * @param {object} [config]
   */
  async getRegions(config) {
    const cfg = this.regionsConfig('', config);
    cfg.method = 'GET';
    return this.request(cfg);
  }

  /**
   * Get a specific region by its code (e.g. 'FL', 'AZ').
   * @param {string} regionCode
   */
  async getRegion(regionCode) {
    const cfg = this.regionsConfig(regionCode);
    cfg.method = 'GET';
    return this.request(cfg);
  }

  /**
   * Get the currently selected region for the authenticated user.
   */
  async getCurrentRegion() {
    const cfg = this.regionsConfig('', { params: { currentlySelected: true } });
    cfg.method = 'GET';
    return this.request(cfg);
  }

  /**
   * Set the current region for a user by akaName.
   * @param {string} regionCode - Region code to switch to (e.g. 'AZ')
   * @param {string} akaName - The user's akaName
   */
  async setCurrentRegion(regionCode, akaName) {
    const cfg = this.regionsConfig(regionCode, { params: { akaName } });
    cfg.method = 'PUT';
    return this.request(cfg, this.afterUpdate);
  }
}

export const avCustomerManagementApi = new AvCustomerManagementApi();
