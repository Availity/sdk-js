import FormData from 'form-data';

import AvFilesApi from '../files';

const mockConfig = {
  id: '123',
  clientId: '123-456',
  customerId: '1194',
};

describe('AvFilesApi', () => {
  let api;
  beforeEach(() => {
    api = new AvFilesApi();
  });

  test('should be defined', () => {
    expect(api).toBeDefined();
  });

  test('post url should be correct', () => {
    expect(api.getUrl(mockConfig)).toBe('/ms/api/availity/internal/core/vault/upload/v1/123');
  });

  test('uploadFile() should call create for reference passed', async () => {
    const data = new FormData();
    data.append('reference', 'fileReference');

    api.create = jest.fn();
    await api.uploadFile(data, mockConfig);

    const conf = api.config(mockConfig);
    conf.headers['X-Availity-Customer-ID'] = mockConfig.customerId;
    conf.headers['X-Client-ID'] = mockConfig.clientId;

    expect(api.create).toHaveBeenLastCalledWith(data, conf);
  });

  test('uploadFile() should call create for file passed', async () => {
    const data = new FormData();
    const file = Buffer.from('hello world'.split(''));
    data.append('filedata', file);

    api.create = jest.fn();
    await api.uploadFile(data, mockConfig);

    const conf = api.config(mockConfig);
    conf.headers['X-Availity-Customer-ID'] = mockConfig.customerId;
    conf.headers['X-Client-ID'] = mockConfig.clientId;

    expect(api.create).toHaveBeenLastCalledWith(data, conf);
  });
});
