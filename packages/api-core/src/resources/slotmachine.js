import AvApi from '../api';

export default class AvSlotMachine extends AvApi {
  constructor({ http, promise, merge, config }) {
    const options = Object.assign(
      {
        path: 'ms/api/availity/internal/platform/slotmachine/graphql',
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

  query(data) {
    return this.create(data);
  }
}
