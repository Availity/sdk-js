import AvNotification from '../notifications';

const mockHttp = jest.fn(() => Promise.resolve({}));

describe('AvNotification', () => {
  let api;

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should be defined', () => {
    api = new AvNotification({ http: mockHttp });
    expect(api).toBeDefined();
  });

  test('should handle no config passed in', () => {
    api = new AvNotification({
      http: mockHttp,
      promise: Promise,
    });
    expect(api).toBeDefined();
  });

  test('deleteByTopic() should call remove with topic added to params.topicId', () => {
    api = new AvNotification({ http: mockHttp });
    api.remove = jest.fn();

    const topic = 'test delete topic';
    const expectedConfig = { params: { topicId: topic } };

    api.deleteByTopic(topic);
    expect(api.remove).toHaveBeenLastCalledWith(expectedConfig);
  });
});
