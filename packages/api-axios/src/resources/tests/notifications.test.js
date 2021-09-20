import AvNotificationsApi from '../notifications';

describe('AvNotificationsApi', () => {
  let api;
  beforeEach(() => {
    api = new AvNotificationsApi();
  });

  test('should be defined', () => {
    expect(api).toBeDefined();
  });

  test('url should be correct', () => {
    expect(api.getUrl(api.config())).toBe('/api/v1/notifications');
  });

  test('deleteByTopic() should call remove with topic added to params.topicId', async () => {
    api.remove = jest.fn();

    const topic = 'test delete topic';
    const expectedConfig = { params: { topicId: topic } };

    await api.deleteByTopic(topic);
    expect(api.remove).toHaveBeenLastCalledWith(expectedConfig);
  });
});
