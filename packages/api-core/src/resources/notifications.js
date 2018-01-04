import AvApi from '../api';

export default class AvNotifications extends AvApi {
  constructor(http, promise, merge, config = {}) {
    const options = Object.assign(
      {
        path: 'api',
        name: 'notifications',
      },
      config
    );
    super(http, promise, merge, options);
  }

  deleteByTopic(topic, config) {
    const removeConfig = this.addParams({ topicId: topic }, config);
    return this.remove(removeConfig);
  }
}
