import AvPdfMicroserviceApi from '../pdfv2';

describe('AvPdfMicroserviceApi', () => {
  let api;
  beforeEach(() => {
    api = new AvPdfMicroserviceApi();
  });

  test('should be defined', () => {
    expect(api).toBeDefined();
  });

  test('url should be correct', () => {
    expect(api.getUrl(api.config())).toBe('/ms/api/availity/internal/spc/pdf/');
  });
});
