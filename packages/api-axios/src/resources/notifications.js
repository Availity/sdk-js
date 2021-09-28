import AvApi from '../api';

export default class AvNotificationsApi extends AvApi {
  constructor(config) {
    super({
      path: 'api',
      name: 'notifications',
      ...config,
    });
  }

  async deleteByTopic(topic, config) {
    const removeConfig = this.addParams({ topicId: topic }, config);
    return this.remove(removeConfig);
  }
}

export const avNotificationsApi = new AvNotificationsApi();
