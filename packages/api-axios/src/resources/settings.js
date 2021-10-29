import AvApi from '../api';
import { avUserApi } from './user';

export default class AvSettingsApi extends AvApi {
  constructor(config) {
    super({
      path: 'api/utils',
      name: 'settings',
      sessionBust: false,
      pageBust: true,
      ...config,
    });
  }

  async getApplication(applicationId, config) {
    if (!applicationId) {
      throw new Error('[applicationId] must be defined');
    }

    if (config?.params?.userId) {
      const queryConfig = this.addParams({ applicationId }, config);
      return this.query(queryConfig);
    }

    const user = await avUserApi.me();
    const queryConfig = this.addParams({ applicationId, userId: user.id }, config);

    return this.query(queryConfig);
  }

  async setApplication(applicationId, data, config) {
    if (typeof applicationId !== 'string' && typeof applicationId !== 'number') {
      config = data;
      data = applicationId;
      applicationId = '';
    }

    if (!applicationId && !data?.scope?.applicationId) {
      throw new Error('[applicationId] must be defined');
    }

    if (data?.scope?.userId) {
      data.scope.applicationId = applicationId;
      return this.update(data, config);
    }

    const user = await avUserApi.me();

    data = data || {};
    data.scope = data.scope || {};
    data.scope.applicationId = applicationId;
    data.scope.userId = user.id;

    return this.update(data, config);
  }
}

export const avSettingsApi = new AvSettingsApi();
