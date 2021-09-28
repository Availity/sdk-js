import AvSettingsApi from '../settings';
import { avUserApi } from '../user';

const testAppId = 'testApplicationId';

const mockUser = {
  id: 'mockUserId',
};

jest.mock('../user');

avUserApi.me = jest.fn(() => Promise.resolve(mockUser));

describe('AvSettingsApi', () => {
  let api;

  beforeEach(() => {
    api = new AvSettingsApi();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should be defined', () => {
    expect(api).toBeDefined();
  });

  test('url should be correct', () => {
    expect(api.getUrl(api.config())).toBe('/api/utils/v1/settings');
  });

  describe('getApplication', () => {
    beforeEach(() => {
      api.query = jest.fn();
    });

    test('should call avUserApi.me and use in query', async () => {
      const expectedQuery = {
        params: {
          applicationId: testAppId,
          userId: mockUser.id,
        },
      };
      await api.getApplication(testAppId);
      expect(avUserApi.me).toHaveBeenCalled();
      expect(api.query).toHaveBeenCalledWith(expectedQuery);
    });

    test('should throw error if no applicationId passed in', async () => {
      await expect(api.getApplication()).rejects.toThrow('[applicationId] must be defined');
    });

    test('should skip call to avUsers.me if userId is in config params', async () => {
      const expectedQuery = {
        params: {
          applicationId: testAppId,
          userId: 'bmoolenaar',
        },
      };
      const testConfig = { params: { userId: 'bmoolenaar' } };
      await api.getApplication(testAppId, testConfig);
      expect(avUserApi.me).not.toHaveBeenCalled();
      expect(api.query).toHaveBeenCalledWith(expectedQuery);
    });
  });

  describe('setApplication', () => {
    beforeEach(() => {
      api.update = jest.fn();
    });

    test('should add applicationId and user.me to scope', async () => {
      const testData = { key: 'value' };
      const testConfig = {};
      const expectedUpdate = {
        scope: {
          applicationId: testAppId,
          userId: mockUser.id,
        },
        ...testData,
      };

      await api.setApplication(testAppId, testData, testConfig);
      expect(avUserApi.me).toHaveBeenCalled();
      expect(api.update).toHaveBeenCalledWith(expectedUpdate, testConfig);
    });

    test('should not throw error if application id passed in as arugment', () => {
      expect(() => api.setApplication(testAppId, {})).not.toThrow();
    });

    test('should not throw error if applicationId in scope', () => {
      expect(() => api.setApplication({ scope: { applicationId: testAppId } })).not.toThrow();
    });

    test('should throw error if no applicationId in argument or data', async () => {
      await expect(api.setApplication()).rejects.toThrow('[applicationId] must be defined');
    });

    test('should skip call to avUsers.me if userId is in data.scope', async () => {
      const testData = { scope: { userId: 'bmoolenaar' }, key: 'value' };
      const testConfig = {};
      const expectedUpdate = {
        scope: {
          applicationId: testAppId,
          userId: 'bmoolenaar',
        },
        key: 'value',
      };

      await api.setApplication(testAppId, testData, testConfig);
      expect(avUserApi.me).not.toHaveBeenCalled();
      expect(api.update).toHaveBeenCalledWith(expectedUpdate, testConfig);
    });
  });
});
