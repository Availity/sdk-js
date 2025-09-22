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

  test('should be defined', () => {
    expect(api).toBeDefined();
  });

  test('uploadFile() should create Upload with correct buffer and config', async () => {
    const Upload = require('@availity/upload-core');
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
    const Upload = require('@availity/upload-core');
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
    const Upload = require('@availity/upload-core');
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
});
