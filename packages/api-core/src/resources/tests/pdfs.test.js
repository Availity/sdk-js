import AvPdfs from '../pdfs';

const mockHttp = jest.fn(() => Promise.resolve({}));
const mockMerge = jest.fn((...args) => Object.assign(...args));

describe('AvPdfs', () => {
  let api;

  test('should be defined', () => {
    api = new AvPdfs(mockHttp, Promise, mockMerge, {});
    expect(api).toBeDefined();
  });

  test('should throw error with bad config', () => {
    api = new AvPdfs(mockHttp, Promise, mockMerge, {});
    expect(() => {
      api = api.getPdf({});
    }).toThrowError('[applicationId], [fileName] and [html] must be defined');
  });

  test('should call onPdf() when pdf completes', async () => {
    api = new AvPdfs(mockHttp, Promise, mockMerge, {});
    api.onPdf = jest.fn();

    const response = {
      data: {
        pdf: {
          href: '/path/to/sample.pdf',
        },
      },
    };

    api.onResponse = jest.fn(() => response);
    await api.getPdf({ html: 'hi', applicationId: 'foo', fileName: 'test' });
    expect(api.onPdf).toHaveBeenCalled();
  });
});
