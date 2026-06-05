import AvApi from '../api';

export default class AvNotifications extends AvApi {
  constructor(config) {
    const options = {
      path: 'api',
      name: 'notifications',
      ...config,
    };
    super(options);
  }

  deleteByTopic(topic, config) {
    const removeConfig = this.addParams({ topicId: topic }, config);
    return this.remove(removeConfig);
  }
}
