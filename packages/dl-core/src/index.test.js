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

    it('stores X-Client-ID header in config', () => {
      const instance = createInstance();
      expect(instance.defaultConfig.config.headers['X-Client-ID']).toBe('test-client');
    });

    it('stores responseType as blob in config', () => {
      const instance = createInstance();
      expect(instance.defaultConfig.config.responseType).toBe('blob');
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
