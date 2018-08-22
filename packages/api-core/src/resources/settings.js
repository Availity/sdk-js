import AvApi from '../api';

export default class AvSettings extends AvApi {
  constructor({ http, promise, merge, avUsers, config }) {
    const options = Object.assign(
      {
        path: 'api/utils',
        name: 'settings',
        sessionBust: false,
        pageBust: true,
      },
      config
    );
    super({
      http,
      promise,
      merge,
      config: options,
    });
    this.avUsers = avUsers;
  }

  getApplication(applicationId, config) {
    if (!applicationId) {
      throw new Error('must define applicationId');
    }
    return this.avUsers.me().then(user => {
      const queryConfig = this.addParams(
        { applicationId, userId: user.id },
        config
      );
      return this.query(queryConfig);
    });
  }

  setApplication(applicaitonId, data, config) {
    if (
      typeof applicaitonId !== 'string' &&
      typeof applicaitonId !== 'number'
    ) {
      config = data;
      data = applicaitonId;
      applicaitonId = '';
    }

    if (!applicaitonId && (!data.scope || !data.scope.applicationId)) {
      throw new Error('must set applicationId in settings call');
    }

    return this.avUsers.me().then(user => {
      data.scope = data.scope || {};
      data.scope.applicationId = applicaitonId;
      data.scope.userId = user.id;
      return this.update(data, config);
    });
  }
}
