import AvApi from './api';

export default class AvProxyApi extends AvApi {
  constructor(config) {
    if (!config?.tenant) {
      throw new Error('[config.tenant] must be defined');
    }

    super({
      name: config.tenant,
      path: `api/v1/proxy`,
      version: '',
      ...config,
    });
  }
}
