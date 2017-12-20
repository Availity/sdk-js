import AvApi from '../resource';

export default class AvProxy extends AvApi {
  constructor(http, promise, config = {}) {
    if (!config || !config.tenant) {
      throw Error('Must specify tenant name for Proxy');
    }
    const options = Object.assign(
      {
        path: `api/v1/proxy/${config.tenant}`,
        version: '',
      },
      config
    );
    super(http, promise, options);
  }
}
