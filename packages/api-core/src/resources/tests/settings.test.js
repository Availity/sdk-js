import AvSettings from '../settings';

const mockHttp = jest.fn(() => Promise.resolve({}));
const mockMerge = jest.fn((...args) => Object.assign(...args));

const mockConfig = {
  scope: {
    applicationId: '123',
    userId: 'myUser',
  },
};

describe('AvSettings', () => {
  let api;

  test('should be defined', () => {
    api = new AvSettings({
      http: mockHttp,
      promise: Promise,
      merge: mockMerge,
      config: {},
    });
    expect(api).toBeDefined();
  });

  test('should handle no config passed in', () => {
    api = new AvSettings({
      http: mockHttp,
      promise: Promise,
      merge: mockMerge,
    });
    expect(api).toBeDefined();
  });

  test('url should be correct', () => {
    api = new AvSettings({
      http: mockHttp,
      promise: Promise,
      merge: mockMerge,
    });
    expect(api.getUrl(api.config(mockConfig))).toBe('/api/utils/v1/settings');
  });

  test('query() should be called with params', () => {
    api = new AvSettings({
      http: mockHttp,
      promise: Promise,
      merge: mockMerge,
      config: {},
    });

    const data = {
      params: {
        applicationId: '123',
        userId: 'myUser',
      },
    };

    api.query = jest.fn();
    api.query(data);
    expect(api.query).toHaveBeenLastCalledWith(data);
  });

  test('update() should be called with scope', async () => {
    api = new AvSettings({
      http: mockHttp,
      promise: Promise,
      merge: mockMerge,
      config: {},
    });
    const data = {
      scope: {
        applicationId: '123',
        userId: 'myUser',
      },
      key: 'value',
    };

    api.update = jest.fn();
    api.update(data);
    expect(api.update).toHaveBeenLastCalledWith(data);
  });
});
