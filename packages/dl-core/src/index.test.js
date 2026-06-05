import DownloadMicroservice from '.';

jest.mock('js-file-download', () => jest.fn());

const fileDownload = require('js-file-download');

const mockHttp = jest.fn(() => Promise.resolve({ data: 'blob-data' }));

function deepMerge(...sources) {
  const result = {};
  for (const source of sources) {
    if (!source) continue;
    for (const key of Object.keys(source)) {
      if (
        typeof source[key] === 'object' &&
        source[key] !== null &&
        !Array.isArray(source[key]) &&
        typeof result[key] === 'object' &&
        result[key] !== null
      ) {
        result[key] = deepMerge(result[key], source[key]);
      } else {
        result[key] = source[key];
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
    jest.clearAllMocks();
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
      instance.query = jest.fn(() => Promise.resolve({ data: 'file' }));

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
