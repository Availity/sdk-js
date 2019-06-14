import AvApi from '../api';

export default class AvCodes extends AvApi {
  constructor({ http, promise, merge, config }) {
    const options = Object.assign(
      {
        name: 'codes',
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
