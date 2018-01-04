import AvNotification from '../notifications';

const mockHttp = jest.fn(() => Promise.resolve({}));
const mockMerge = jest.fn((...args) => Object.assign(...args));

describe('AvNotification', () => {
  let api;

  test('should be defined', () => {
    api = new AvNotification(mockHttp, Promise, mockMerge, {});
    expect(api).toBeDefined();
  });

  test('should handle no config passed in', () => {
    api = new AvNotification(mockHttp, Promise, mockMerge);
    expect(api).toBeDefined();
  });

  test('deleteByTopic() should call remove with topic added to params.topicId', () => {
    api = new AvNotification(mockHttp, Promise, mockMerge, {});
    api.remove = jest.fn();

    const topic = 'test delete topic';
    const expectedConfig = Object.assign({}, { params: { topicId: topic } });

    api.deleteByTopic(topic);
    expect(api.remove).toHaveBeenLastCalledWith(expectedConfig);
  });
});
