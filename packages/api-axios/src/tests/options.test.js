import options from '../options';

describe('Api options', () => {
  describe('API', () => {
    it('has correct path', () => {
      expect(options.API.path).toBe('/api');
    });

    it('has correct default version', () => {
      expect(options.API.version).toBe('/v1');
    });

    it('enables cache by default', () => {
      expect(options.API.cache).toBe(true);
    });

    it('enables polling by default', () => {
      expect(options.API.polling).toBe(true);
    });

    it('uses GET for polling method', () => {
      expect(options.API.pollingMethod).toBe('GET');
    });

    it('has withCredentials enabled', () => {
      expect(options.API.withCredentials).toBe(true);
    });
  });

  describe('MS', () => {
    it('has correct microservice path', () => {
      expect(options.MS.path).toBe('/ms/api/availity/internal');
    });

    it('has no default version', () => {
      expect(options.MS.version).toBeNull();
    });

    it('disables cache by default', () => {
      expect(options.MS.cache).toBe(false);
    });

    it('disables polling by default', () => {
      expect(options.MS.polling).toBe(false);
    });

    it('uses POST for polling method', () => {
      expect(options.MS.pollingMethod).toBe('POST');
    });

    it('has withCredentials enabled', () => {
      expect(options.MS.withCredentials).toBe(true);
    });
  });
});
