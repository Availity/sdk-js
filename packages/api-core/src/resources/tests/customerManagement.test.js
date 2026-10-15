import AvCustomerManagement from '../customerManagement';

const mockHttp = vi.fn(() => Promise.resolve({}));

const ORGS_URL = '/cloud/web/appl/customer-management/legacy/v1/organizations';
const REGIONS_URL = '/cloud/web/appl/customer-management/legacy/sdk/platform/v1/regions';

describe('AvCustomerManagement', () => {
  let api;

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('should be defined', () => {
    api = new AvCustomerManagement({ http: mockHttp });
    expect(api).toBeDefined();
  });

  test('should handle no extra config passed in', () => {
    api = new AvCustomerManagement({ http: mockHttp, promise: Promise });
    expect(api).toBeDefined();
  });

  test('orgsConfig should build the organizations url', () => {
    api = new AvCustomerManagement({ http: mockHttp });
    expect(api.orgsConfig().url).toBe(ORGS_URL);
  });

  test('orgsConfig should append the id when provided', () => {
    api = new AvCustomerManagement({ http: mockHttp });
    expect(api.orgsConfig('123').url).toBe(`${ORGS_URL}/123`);
  });

  test('regionsConfig should build the regions url', () => {
    api = new AvCustomerManagement({ http: mockHttp });
    expect(api.regionsConfig().url).toBe(REGIONS_URL);
  });

  test('regionsConfig should append the id when provided', () => {
    api = new AvCustomerManagement({ http: mockHttp });
    expect(api.regionsConfig('FL').url).toBe(`${REGIONS_URL}/FL`);
  });

  test('getOrganization should call request with GET and the org url', () => {
    api = new AvCustomerManagement({ http: mockHttp });
    api.request = vi.fn();

    api.getOrganization('123');

    expect(api.request).toHaveBeenCalledTimes(1);
    const [cfg] = api.request.mock.calls[0];
    expect(cfg.method).toBe('GET');
    expect(cfg.url).toBe(`${ORGS_URL}/123`);
  });

  test('getOrganizationData should unwrap response.data.organization', async () => {
    api = new AvCustomerManagement({ http: mockHttp });
    const organization = { id: '123', name: 'Test Org' };
    api.getOrganization = vi.fn(() => Promise.resolve({ data: { organization } }));

    await expect(api.getOrganizationData('123')).resolves.toEqual(organization);
    expect(api.getOrganization).toHaveBeenCalledWith('123');
  });

  test('searchByName should add name to the query params', () => {
    api = new AvCustomerManagement({ http: mockHttp });
    api.getOrganizations = vi.fn();

    api.searchByName('Acme');

    expect(api.getOrganizations).toHaveBeenCalledWith({ params: { name: 'Acme' } });
  });

  test('searchByName should merge existing params', () => {
    api = new AvCustomerManagement({ http: mockHttp });
    api.getOrganizations = vi.fn();

    api.searchByName('Acme', { params: { limit: 10 } });

    expect(api.getOrganizations).toHaveBeenCalledWith({ params: { name: 'Acme', limit: 10 } });
  });

  test('searchByTaxId should add taxId to the query params', () => {
    api = new AvCustomerManagement({ http: mockHttp });
    api.getOrganizations = vi.fn();

    api.searchByTaxId('123456789');

    expect(api.getOrganizations).toHaveBeenCalledWith({ params: { taxId: '123456789' } });
  });

  test('getRegions should call request with GET and the regions url', () => {
    api = new AvCustomerManagement({ http: mockHttp });
    api.request = vi.fn();

    api.getRegions();

    const [cfg] = api.request.mock.calls[0];
    expect(cfg.method).toBe('GET');
    expect(cfg.url).toBe(REGIONS_URL);
  });

  test('getRegion should call request with GET and the region code url', () => {
    api = new AvCustomerManagement({ http: mockHttp });
    api.request = vi.fn();

    api.getRegion('FL');

    const [cfg] = api.request.mock.calls[0];
    expect(cfg.method).toBe('GET');
    expect(cfg.url).toBe(`${REGIONS_URL}/FL`);
  });

  test('getCurrentRegion should pass currentlySelected: true as a param', () => {
    api = new AvCustomerManagement({ http: mockHttp });
    api.request = vi.fn();

    api.getCurrentRegion();

    const [cfg] = api.request.mock.calls[0];
    expect(cfg.method).toBe('GET');
    expect(cfg.params).toEqual({ currentlySelected: true });
    expect(cfg.url).toBe(REGIONS_URL);
  });

  test('setCurrentRegion should use PUT and pass the akaName param', () => {
    api = new AvCustomerManagement({ http: mockHttp });
    api.request = vi.fn();

    api.setCurrentRegion('FL', 'testAka');

    expect(api.request).toHaveBeenCalledTimes(1);
    const [cfg, callback] = api.request.mock.calls[0];
    expect(cfg.method).toBe('PUT');
    expect(cfg.params).toEqual({ akaName: 'testAka' });
    expect(cfg.url).toBe(`${REGIONS_URL}/FL`);
    expect(callback).toBe(api.afterUpdate);
  });
});
