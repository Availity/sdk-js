import Upload from '@availity/upload-core';
import AvFilesApi from '../files';

jest.mock('@availity/upload-core', () =>
  jest.fn().mockImplementation(() => ({
    generateId: jest.fn().mockResolvedValue('test-id'),
    start: jest.fn(),
    onSuccess: [],
    onError: [],
  }))
);

const mockConfig = {
  id: '123',
  clientId: '123-456',
  customerId: '1194',
};

const endpoint = '/cloud/web/appl/vault/upload/v1/resumable';

describe('AvFilesApi', () => {
  let api;
  beforeEach(() => {
    api = new AvFilesApi();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should be defined', () => {
    expect(api).toBeDefined();
  });

  test('uploadFile() should create Upload with correct buffer and config', async () => {
    const data = { foo: 'bar' };

    const mockUpload = {
      generateId: jest.fn().mockResolvedValue('test-id'),
      start: jest.fn(),
      onSuccess: [],
      onError: [],
    };
    Upload.mockReturnValue(mockUpload);

    setTimeout(() => mockUpload.onSuccess[0](), 0);

    await api.uploadFile(data, mockConfig);

    expect(Upload).toHaveBeenCalledWith(
      expect.objectContaining({
        name: expect.any(String),
        type: 'application/json',
        size: expect.any(Number),
      }),
      {
        bucketId: '123',
        customerId: '1194',
        clientId: '123-456',
        endpoint,
      }
    );
  });

  test('uploadFile() should use fileName when provided', async () => {
    const data = { foo: 'bar' };

    const mockUpload = {
      generateId: jest.fn().mockResolvedValue('test-id'),
      start: jest.fn(),
      onSuccess: [],
      onError: [],
    };
    Upload.mockReturnValue(mockUpload);

    setTimeout(() => mockUpload.onSuccess[0](), 0);

    await api.uploadFile(data, { fileName: 'test.json', ...mockConfig });

    const [buffer] = Upload.mock.calls[0];
    expect(buffer.name).toBe('test.json');
  });

  test('uploadFile() should generate hash filename when fileName not provided', async () => {
    const data = { foo: 'bar' };

    const mockUpload = {
      generateId: jest.fn().mockResolvedValue('test-id'),
      start: jest.fn(),
      onSuccess: [],
      onError: [],
    };
    Upload.mockReturnValue(mockUpload);

    setTimeout(() => mockUpload.onSuccess[0](), 0);

    await api.uploadFile(data, mockConfig);

    const [buffer] = Upload.mock.calls[0];
    // Name should be in format `<alpha-numeric>.json`
    expect(buffer.name).toMatch(/^[\dA-Za-z]+\.json$/);
  });

  test('uploadFile() should throw when customerId is missing', async () => {
    await expect(api.uploadFile({}, { id: '123', clientId: '456' })).rejects.toThrow(
      '[config.customerId] and [config.clientId] must be defined'
    );
  });

  test('uploadFile() should throw when clientId is missing', async () => {
    await expect(api.uploadFile({}, { id: '123', customerId: '456' })).rejects.toThrow(
      '[config.customerId] and [config.clientId] must be defined'
    );
  });

  test('uploadFile() should reject when upload errors', async () => {
    const data = { foo: 'bar' };
    const uploadError = new Error('Network failure');

    const mockUpload = {
      generateId: jest.fn().mockResolvedValue('test-id'),
      start: jest.fn(),
      onSuccess: [],
      onError: [],
    };
    Upload.mockReturnValue(mockUpload);

    setTimeout(() => mockUpload.onError[0](uploadError), 0);

    await expect(api.uploadFile(data, mockConfig)).rejects.toThrow('Network failure');
  });

  describe('hashData', () => {
    test('returns a base36 string', () => {
      const result = api.hashData({ foo: 'bar' });
      expect(result).toMatch(/^[\da-z]+$/);
    });

    test('returns consistent hash for same input', () => {
      const data = { hello: 'world' };
      expect(api.hashData(data)).toBe(api.hashData(data));
    });

    test('returns different hash for different input', () => {
      expect(api.hashData({ a: 1 })).not.toBe(api.hashData({ a: 2 }));
    });

    test('handles empty object', () => {
      const result = api.hashData({});
      expect(result).toMatch(/^[\da-z]+$/);
    });
  });
});
