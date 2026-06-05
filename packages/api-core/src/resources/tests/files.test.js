import AvFiles from '../files';

const FormData = require('form-data');

const mockHttp = jest.fn(() => Promise.resolve({}));

const mockConfig = {
  id: '123',
  clientId: '123-456',
  customerId: '1194',
};

describe('AvFiles', () => {
  let api;

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
    expect(api.getUrl(mockConfig)).toBe(
      '/ms/api/availity/internal/core/vault/upload/v1/123'
    );
  });

  test('uploadFile() should call create for reference passed', () => {
    api = new AvFiles({ http: mockHttp });

    const data = new FormData();
    data.append('reference', 'fileReference');

    api.create = jest.fn();
    api.uploadFile(data, mockConfig);
    expect(api.create).toHaveBeenLastCalledWith(data, api.config(mockConfig));
  });

  test('uploadFile() should call create for file passed', async () => {
    api = new AvFiles({ http: mockHttp });
    const data = new FormData();
    const file = Buffer.from([...'hello world']);
    data.append('filedata', file);

    api.create = jest.fn();
    api.uploadFile(data, mockConfig);
    expect(api.create).toHaveBeenLastCalledWith(data, api.config(mockConfig));
  });
});
