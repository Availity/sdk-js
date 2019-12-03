import AvApi from '../api';

export default class AvSettings extends AvApi {
  constructor({ http, promise, merge, avUsers, config }) {
    const options = {
      path: 'api/utils',
      name: 'settings',
      sessionBust: false,
      pageBust: true,
      ...config,
    };
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

    if (config && config.params && config.params.userId) {
      const queryConfig = this.addParams({ applicationId }, config);
      return this.query(queryConfig);
    }

    return this.avUsers.me().then(user => {
      const queryConfig = this.addParams(
        { applicationId, userId: user.id },
        config
      );
      return this.query(queryConfig);
    });
  }

  setApplication(applicationId, data, config) {
    if (!this.avUsers || !this.avUsers.me) {
      throw new Error('avUsers must be defined');
    }

    if (
      typeof applicationId !== 'string' &&
      typeof applicationId !== 'number'
    ) {
      config = data;
      data = applicationId;
      applicationId = '';
    }

    if (!applicationId && (!data || !data.scope || !data.scope.applicationId)) {
      throw new Error('applicationId must be defined');
    }

    if (data && data.scope && data.scope.userId) {
      data.scope.applicationId = applicationId;
      return this.update(data, config);
    }

    return this.avUsers.me().then(user => {
      data = data || {};
      data.scope = data.scope || {};
      data.scope.applicationId = applicationId;
      data.scope.userId = user.id;
      return this.update(data, config);
    });
  }
}
