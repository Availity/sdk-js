import AvApi from '../api';

export default class AvNotification extends AvApi {
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

  deleteByTopic(topic) {
    let config = this.config();
    const url = `${this.getUrl(config)}?topicId=${topic}`;
    config = this.config({
      url,
    });
    return this.request(config, this.afterRemove || this.afterDelete);
  }
}
