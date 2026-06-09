import AvPdfMicroserviceApi from '../pdfv2';

describe('AvPdfMicroserviceApi', () => {
  let api;
  beforeEach(() => {
    api = new AvPdfMicroserviceApi();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('should be defined', () => {
    expect(api).toBeDefined();
  });

  test('url should be correct', () => {
    expect(api.getUrl(api.config())).toBe('/ms/api/availity/internal/spc/pdf/');
  });

  test('url should include id when provided', () => {
    expect(api.getUrl(api.config(), 'doc-123')).toBe('/ms/api/availity/internal/spc/pdf/doc-123');
  });

  test('url should use config.id when id param is not provided', () => {
    expect(api.getUrl({ id: 'cfg-456' })).toBe('/ms/api/availity/internal/spc/pdf/cfg-456');
  });

  test('url should prefer id param over config.id', () => {
    expect(api.getUrl({ id: 'cfg-456' }, 'param-789')).toBe('/ms/api/availity/internal/spc/pdf/param-789');
  });
});
