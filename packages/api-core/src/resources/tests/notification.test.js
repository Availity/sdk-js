import AvNotification from '../notification';

const mockHttp = jest.fn(() => Promise.resolve({}));

describe('AvNotification', () => {
  let api;

  test('should be defined', () => {
    api = new AvNotification(mockHttp, Promise, {});
    expect(api).toBeDefined();
  });

  test('should handle no config passed in', () => {
    api = new AvNotification(mockHttp, Promise);
    expect(api).toBeDefined();
  });

  test('deleteByTopic() should call query with topic added to params.topicId', () => {
    api = new AvNotification(mockHttp, Promise, {});
    api.remove = jest.fn();

    const topic = 'test delete topic';
    const expectedConfig = Object.assign({}, { params: { topicId: topic } });

    api.deleteByTopic(topic);
    expect(api.remove).toHaveBeenLastCalledWith(expectedConfig);
  });
});
