import AvDownloadApi from './download';
import DownloadMicroservice from '@availity/dl-core';

describe('AvDownloadApi', () => {
  test('should be an instance of DownloadMicroservice', () => {
    const api = new AvDownloadApi({ clientId: 'test-client' });
    expect(api).toBeInstanceOf(DownloadMicroservice);
  });

  test('should throw if no config is provided', () => {
    expect(() => new AvDownloadApi()).toThrow();
  });

  test('should throw if clientId is missing from config', () => {
    expect(() => new AvDownloadApi({})).toThrow('[config.clientId] must be defined');
  });

  test('should construct successfully with clientId', () => {
    expect(() => new AvDownloadApi({ clientId: 'my-app' })).not.toThrow();
  });

  test('should have getAttachment method', () => {
    const api = new AvDownloadApi({ clientId: 'my-app' });
    expect(typeof api.getAttachment).toBe('function');
  });

  test('should have downloadAttachment method', () => {
    const api = new AvDownloadApi({ clientId: 'my-app' });
    expect(typeof api.downloadAttachment).toBe('function');
  });
});
