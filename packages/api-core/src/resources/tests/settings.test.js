import AvSettings from '../settings';

const mockHttp = jest.fn(() => Promise.resolve({}));
const mockMerge = jest.fn((...args) => Object.assign(...args));

const testAppId = 'testApplicationId';

const mockUser = {
  id: 'mockUserId',
};
const mockAvUsers = {
  me: jest.fn(() => Promise.resolve(mockUser)),
};

describe('AvSettings', () => {
  let api;

  beforeEach(() => {
    api = new AvSettings({
      http: mockHttp,
      promise: Promise,
      merge: mockMerge,
      avUsers: mockAvUsers,
      config: {},
    });
  });

  test('should be defined', () => {
    expect(api).toBeDefined();
  });

  describe('getApplication', () => {
    beforeEach(() => {
      api.query = jest.fn();
    });
    test('should call avUsers.me and use in query', async () => {
      const expectedQuery = {
        params: {
          applicationId: testAppId,
          userId: mockUser.id,
        },
      };
      await api.getApplication(testAppId);
      expect(mockAvUsers.me).toHaveBeenCalled();
      expect(api.query).toHaveBeenCalledWith(expectedQuery);
    });

    test('should throw error if no applicationId passed in', () => {
      expect(() => api.getApplication()).toThrow(
        'applicationId must be defined'
      );
    });

    test('should throw if no avUsers defined', () => {
      delete api.avUsers;
      expect(() => api.getApplication('appId')).toThrow(
        'avUsers must be defined'
      );
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
      expect(mockAvUsers.me).toHaveBeenCalled();
      expect(api.update).toHaveBeenCalledWith(expectedUpdate, testConfig);
    });

    test('should not throw error if application id passed in as arugment', () => {
      expect(() => api.setApplication(testAppId, {})).not.toThrow();
    });

    test('should not throw error if applicationId in scope', () => {
      expect(() =>
        api.setApplication({ scope: { applicationId: testAppId } })
      ).not.toThrow();
    });

    test('should throw error if no applicationId in argument or data', () => {
      expect(() => api.setApplication()).toThrow(
        'applicationId must be defined'
      );
    });

    test('should throw error if no avUsers defined', () => {
      delete api.avUsers;
      expect(() => api.setApplication('appId', {})).toThrow(
        'avUsers must be defined'
      );
    });
  });
});
