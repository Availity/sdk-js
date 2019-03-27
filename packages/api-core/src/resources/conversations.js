import AvApi from '../api';

export default class AvDisclaimers extends AvApi {
  constructor({ http, promise, merge, config }) {
    const options = Object.assign(
      {
        path: '/api',
        name: '/conversations/summary',
      },
      config
    );
    super({
      http,
      promise,
      merge,
      config: options,
    });
  }
}
