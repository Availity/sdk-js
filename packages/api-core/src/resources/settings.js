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
      throw new Error('applicationId must be defined');
    }
    if (!this.avUsers || !this.avUsers.me) {
      throw new Error('avUsers must be defined');
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
    if (!this.avUsers || !this.avUsers.me) {
      throw new Error('avUsers must be defined');
    }

    if (
      typeof applicaitonId !== 'string' &&
      typeof applicaitonId !== 'number'
    ) {
      config = data;
      data = applicaitonId;
      applicaitonId = '';
    }

    if (!applicaitonId && (!data || !data.scope || !data.scope.applicationId)) {
      throw new Error('applicationId must be defined');
    }

    return this.avUsers.me().then(user => {
      data = data || {};
      data.scope = data.scope || {};
      data.scope.applicationId = applicaitonId;
      data.scope.userId = user.id;
      return this.update(data, config);
    });
  }
}
