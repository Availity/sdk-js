import AvPdfApi from '../pdf';

describe('AvPdfApi', () => {
  let api;
  beforeEach(() => {
    api = new AvPdfApi();
  });

  test('should be defined', () => {
    expect(api).toBeDefined();
  });

  test('url should be correct', () => {
    expect(api.getUrl(api.config())).toBe('/api/utils/v1/pdfs');
  });

  test('should call onPdf() when pdf completes', async () => {
    api.onPdf = jest.fn();

    const response = {
      data: {
        links: {
          pdf: {
            href: '/path/to/sample.pdf',
          },
        },
      },
    };

    api.post = jest.fn(() => response);
    await api.getPdf({ html: 'hi', applicationId: 'foo', fileName: 'test' });
    expect(api.onPdf).toHaveBeenCalled();
  });
});
