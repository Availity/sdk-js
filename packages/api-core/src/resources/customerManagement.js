import AvApi from '../api';

export default class AvCustomerManagement extends AvApi {
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

  getOrganization(customerId) {
    const cfg = this.orgsConfig(customerId);
    cfg.method = 'GET';
    return this.request(cfg, this.afterGet);
  }

  getOrganizations(config) {
    const cfg = this.orgsConfig('', config);
    cfg.method = 'GET';
    return this.request(cfg, this.afterQuery);
  }

  getOrganizationData(customerId) {
    return this.getOrganization(customerId).then((response) => response?.data?.organization);
  }

  searchByName(name, config) {
    return this.getOrganizations({
      ...config,
      params: { name, ...config?.params },
    });
  }

  searchByTaxId(taxId, config) {
    return this.getOrganizations({
      ...config,
      params: { taxId, ...config?.params },
    });
  }

  // --- Regions ---

  getRegions(config) {
    const cfg = this.regionsConfig('', config);
    cfg.method = 'GET';
    return this.request(cfg);
  }

  getRegion(regionCode) {
    const cfg = this.regionsConfig(regionCode);
    cfg.method = 'GET';
    return this.request(cfg);
  }

  getCurrentRegion() {
    const cfg = this.regionsConfig('', { params: { currentlySelected: true } });
    cfg.method = 'GET';
    return this.request(cfg);
  }

  setCurrentRegion(regionCode, akaName) {
    const cfg = this.regionsConfig(regionCode, { params: { akaName } });
    cfg.method = 'PUT';
    return this.request(cfg, this.afterUpdate);
  }
}
