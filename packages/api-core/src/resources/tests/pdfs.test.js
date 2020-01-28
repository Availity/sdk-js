import AvPdfs from '../pdfs';

const mockHttp = jest.fn(() => Promise.resolve({}));
const mockMerge = jest.fn((...args) => Object.assign(...args));

describe('AvPdfs', () => {
  let api;

  test('should be defined', () => {
    api = new AvPdfs({
      http: mockHttp,
      promise: Promise,
      merge: mockMerge,
      config: {},
    });
    expect(api).toBeDefined();
  });

  test('should throw error with bad config', () => {
    api = new AvPdfs({
      http: mockHttp,
      promise: Promise,
      merge: mockMerge,
      config: {},
    });
    expect(() => {
      api = api.getPdf({});
    }).toThrow('[applicationId], [fileName] and [html] must be defined');
  });

  test('should call onPdf() when pdf completes', async () => {
    api = new AvPdfs({
      http: mockHttp,
      promise: Promise,
      merge: mockMerge,
      config: {},
    });
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
