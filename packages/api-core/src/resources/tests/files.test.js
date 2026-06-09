import FormData from 'form-data';
import AvFiles from '../files';

const mockHttp = vi.fn(() => Promise.resolve({}));

const mockConfig = {
  id: '123',
  clientId: '123-456',
  customerId: '1194',
};

describe('AvFiles', () => {
  let api;

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('should be defined', () => {
    api = new AvFiles({ http: mockHttp });
    expect(api).toBeDefined();
  });

  test('should handle no config passed in', () => {
    api = new AvFiles({
      http: mockHttp,
      promise: Promise,
    });
    expect(api).toBeDefined();
  });

  test('post url should be correct', () => {
    api = new AvFiles({
      http: mockHttp,
      promise: Promise,
    });
    expect(api.getUrl(mockConfig)).toBe('/ms/api/availity/internal/core/vault/upload/v1/123');
  });

  test('uploadFile() should call create for reference passed', () => {
    api = new AvFiles({ http: mockHttp });

    const data = new FormData();
    data.append('reference', 'fileReference');

    api.create = vi.fn();
    api.uploadFile(data, mockConfig);
    expect(api.create).toHaveBeenLastCalledWith(data, api.config(mockConfig));
  });

  test('uploadFile() should throw when customerId is missing', () => {
    api = new AvFiles({ http: mockHttp });
    expect(() => api.uploadFile(new FormData(), { id: '123', clientId: '456' })).toThrow(
      '[config.customerId] and [config.clientId] must be defined'
    );
  });

  test('uploadFile() should throw when clientId is missing', () => {
    api = new AvFiles({ http: mockHttp });
    expect(() => api.uploadFile(new FormData(), { id: '123', customerId: '456' })).toThrow(
      '[config.customerId] and [config.clientId] must be defined'
    );
  });

  test('uploadFile() should call create for file passed', async () => {
    api = new AvFiles({ http: mockHttp });
    const data = new FormData();
    const file = Buffer.from([...'hello world']);
    data.append('filedata', file);

    api.create = vi.fn();
    api.uploadFile(data, mockConfig);
    expect(api.create).toHaveBeenLastCalledWith(data, api.config(mockConfig));
  });
});
