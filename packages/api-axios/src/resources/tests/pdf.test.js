import AvPdfApi from '../pdf';

describe('AvPdfApi', () => {
  let api;
  beforeEach(() => {
    api = new AvPdfApi();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('should be defined', () => {
    expect(api).toBeDefined();
  });

  test('url should be correct', () => {
    expect(api.getUrl(api.config())).toBe('/api/utils/v1/pdfs');
  });

  test('should throw error when applicationId, fileName, or html is missing', async () => {
    await expect(api.getPdf({})).rejects.toThrow('[applicationId], [fileName] and [html] must be defined');
  });

  test('should call onPdf() when pdf completes', async () => {
    api.onPdf = vi.fn();

    const response = {
      data: {
        links: {
          pdf: {
            href: '/path/to/sample.pdf',
          },
        },
      },
    };

    api.post = vi.fn(() => response);
    await api.getPdf({ html: 'hi', applicationId: 'foo', fileName: 'test' });
    expect(api.onPdf).toHaveBeenCalled();
  });
});
