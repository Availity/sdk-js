import AvApi from '../api';

export default class AvNotifications extends AvApi {
  constructor({ http, promise, merge, config }) {
    const options = {
      path: 'api',
      name: 'notifications',
      ...config,
    };
    super({
      http,
      promise,
      merge,
      config: options,
    });
  }

  deleteByTopic(topic, config) {
    const removeConfig = this.addParams({ topicId: topic }, config);
    return this.remove(removeConfig);
  }
}
