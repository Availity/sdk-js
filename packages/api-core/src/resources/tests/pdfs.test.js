import AvPdfs from '../pdfs';

const mockHttp = jest.fn(() => Promise.resolve({}));

describe('AvPdfs', () => {
  let api;

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should be defined', () => {
    api = new AvPdfs({ http: mockHttp });
    expect(api).toBeDefined();
  });

  test('should throw error with bad config', () => {
    api = new AvPdfs({ http: mockHttp });
    expect(() => api.getPdf({})).toThrow('[applicationId], [fileName] and [html] must be defined');
  });

  test('should call onPdf() when pdf completes', async () => {
    api = new AvPdfs({ http: mockHttp });
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

    api.onResponse = jest.fn(() => response);
    await api.getPdf({ html: 'hi', applicationId: 'foo', fileName: 'test' });
    expect(api.onPdf).toHaveBeenCalled();
  });
});
