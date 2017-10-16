import {AvApi} from '../resource';

export class AvProxy extends AvApi {
  constructor(http, promise, config = {}) {
    if (!config || !config.tenant) {
      throw Error('Must specify tenant name for Proxy');
    }
    const thisConfig = Object.assign({
      path: `api/v1/proxy/${config.tenant}`,
      version: ''
    }, config);
    super(http, promise, thisConfig);
  }
}
