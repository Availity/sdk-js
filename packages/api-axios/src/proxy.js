import AvApi from './api';

export default class AvProxyApi extends AvApi {
  constructor(config) {
    if (!config?.tenant) {
      throw new Error('[config.tenant] must be defined');
    }

    super({
      path: `api/v1/proxy/${config.tenant}`,
      version: '',
      ...config,
    });
  }
}
