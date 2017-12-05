import AvApi from '../resource';

export default class AvNotification extends AvApi {
  constructor(http, promise, config = {}) {
    const thisConfig = Object.assign(
      {
        path: 'api',
        name: 'notification',
      },
      config
    );
    super(http, promise, thisConfig);
  }

  deleteByTopic(topic) {
    const params = Object.assign({}, { topicId: topic });
    return this.query(Object.assign({}, { params }));
  }
}
