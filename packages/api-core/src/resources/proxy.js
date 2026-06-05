import AvApi from '../api';

export default class AvProxy extends AvApi {
  constructor(config) {
    if (!config || !config.tenant) {
      throw new Error('Must specify tenant name for Proxy');
    }
    const options = {
      path: `api/v1/proxy/${config.tenant}`,
      version: '',
      ...config,
    };
    super(options);
  }
}
