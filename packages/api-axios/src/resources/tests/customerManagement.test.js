import AvCustomerManagementApi from '../customerManagement';

describe('AvCustomerManagementApi', () => {
  let api;

  beforeEach(() => {
    api = new AvCustomerManagementApi();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('should be defined', () => {
    expect(api).toBeDefined();
  });

  test('orgsConfig url should be correct without id', () => {
    expect(api.orgsConfig().url).toBe('/cloud/web/appl/customer-management/legacy/v1/organizations');
  });

  test('orgsConfig url should include id when provided', () => {
    expect(api.orgsConfig('213720').url).toBe('/cloud/web/appl/customer-management/legacy/v1/organizations/213720');
  });

  test('regionsConfig url should be correct without id', () => {
    expect(api.regionsConfig().url).toBe('/cloud/web/appl/customer-management/legacy/sdk/platform/v1/regions');
  });

  test('regionsConfig url should include id when provided', () => {
    expect(api.regionsConfig('FL').url).toBe('/cloud/web/appl/customer-management/legacy/sdk/platform/v1/regions/FL');
  });

  test('getOrganization should call request with method GET and org url', async () => {
    api.request = vi.fn().mockResolvedValue({});

    await api.getOrganization('213720');

    const [cfg] = api.request.mock.calls[0];
    expect(cfg.method).toBe('GET');
    expect(cfg.url).toBe('/cloud/web/appl/customer-management/legacy/v1/organizations/213720');
  });

  test('getOrganizationData should unwrap data.organization', async () => {
    const organization = { id: '213720', name: 'Test Org' };
    api.getOrganization = vi.fn().mockResolvedValue({ data: { organization } });

    const result = await api.getOrganizationData('213720');

    expect(api.getOrganization).toHaveBeenCalledWith('213720');
    expect(result).toEqual(organization);
  });

  test('searchByName should include name in params', async () => {
    api.request = vi.fn().mockResolvedValue({});

    await api.searchByName('Acme');

    const [cfg] = api.request.mock.calls[0];
    expect(cfg.method).toBe('GET');
    expect(cfg.params).toEqual({ name: 'Acme' });
  });

  test('searchByTaxId should include taxId in params', async () => {
    api.request = vi.fn().mockResolvedValue({});

    await api.searchByTaxId('123456789');

    const [cfg] = api.request.mock.calls[0];
    expect(cfg.method).toBe('GET');
    expect(cfg.params).toEqual({ taxId: '123456789' });
  });

  test('getCurrentRegion should pass currentlySelected true', async () => {
    api.request = vi.fn().mockResolvedValue({});

    await api.getCurrentRegion();

    const [cfg] = api.request.mock.calls[0];
    expect(cfg.method).toBe('GET');
    expect(cfg.params).toEqual({ currentlySelected: true });
  });

  test('setCurrentRegion should call request with method PUT and akaName param', async () => {
    api.request = vi.fn().mockResolvedValue({});

    await api.setCurrentRegion('AZ', 'jsmith');

    const [cfg] = api.request.mock.calls[0];
    expect(cfg.method).toBe('PUT');
    expect(cfg.params).toEqual({ akaName: 'jsmith' });
    expect(cfg.url).toBe('/cloud/web/appl/customer-management/legacy/sdk/platform/v1/regions/AZ');
  });
});
