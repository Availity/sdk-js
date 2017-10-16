import {AvApi} from '../resource';

export class AvSpaces extends AvApi {
  constructor(http, promise, config = {}) {
    const thisConfig = Object.assign({
      path: 'api/sdk/platform',
      name: 'spaces'
    }, config);
    super(http, promise, thisConfig);
  }
}
