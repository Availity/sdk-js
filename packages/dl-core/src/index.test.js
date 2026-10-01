import fileDownload from 'js-file-download';
import DownloadMicroservice from '.';

vi.mock('js-file-download', () => ({ default: vi.fn() }));

const mockHttp = vi.fn(() => Promise.resolve({ data: 'blob-data' }));

function deepMerge(...sources) {
  const result = {};
  for (const source of sources) {
    if (source) {
      for (const key of Object.keys(source)) {
        result[key] =
          typeof source[key] === 'object' &&
          source[key] !== null &&
          !Array.isArray(source[key]) &&
          typeof result[key] === 'object' &&
          result[key] !== null
            ? deepMerge(result[key], source[key])
            : source[key];
      }
    }
  }
  return result;
}

function createInstance(configOverrides = {}) {
  return new DownloadMicroservice({
    http: mockHttp,
    promise: Promise,
    merge: deepMerge,
    config: { clientId: 'test-client', ...configOverrides },
  });
}

describe('DownloadMicroservice', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('constructor', () => {
    it('throws when config.clientId is missing', () => {
      expect(
        () =>
          new DownloadMicroservice({
            http: mockHttp,
            promise: Promise,
            merge: deepMerge,
            config: {},
          })
      ).toThrow('[config.clientId] must be defined');
    });

    it('applies X-Client-ID header on outgoing requests', async () => {
      // The real test: does the header actually reach the HTTP call?
      // defaultConfig.config.headers is an internal nesting artifact of how
      // AvMicroservice merges options — verify the header on the dispatched request.
      const instance = createInstance({ clientId: 'test-client' });
      await instance.getAttachment({ name: 'test-resource' });

      const dispatchedConfig = mockHttp.mock.calls[0][0];
      expect(dispatchedConfig.headers?.['X-Client-ID']).toBe('test-client');
    });

    it('applies responseType blob on outgoing requests', async () => {
      const instance = createInstance();
      await instance.getAttachment({ name: 'test-resource' });

      const dispatchedConfig = mockHttp.mock.calls[0][0];
      expect(dispatchedConfig.responseType).toBe('blob');
    });
  });

  describe('getAttachment', () => {
    it('delegates to query', () => {
      const instance = createInstance();
      instance.query = vi.fn(() => Promise.resolve({ data: 'file' }));

      const config = { params: { id: '123' } };
      instance.getAttachment(config);

      expect(instance.query).toHaveBeenCalledWith(config);
    });
  });

  describe('downloadAttachment', () => {
    it('calls fileDownload with data, filename, and mime type', () => {
      const instance = createInstance();
      const data = new Blob(['test']);
      instance.downloadAttachment(data, 'report.pdf', 'application/pdf');

      expect(fileDownload).toHaveBeenCalledWith(data, 'report.pdf', 'application/pdf');
    });
  });
});
