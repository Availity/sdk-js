import AvApi from '../api';

export default class AvNotifications extends AvApi {
  constructor(http, promise, config = {}) {
    const options = Object.assign(
      {
        path: 'api',
        name: 'notifications',
      },
      config
    );
    super(http, promise, options);
  }

  deleteByTopic(topic, config) {
    const removeConfig = this.addParams({ topicId: topic }, config);
    return this.remove(removeConfig);
  }
}
