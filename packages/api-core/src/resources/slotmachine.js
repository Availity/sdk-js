import { AvMicroservice } from '..';

export default class AvSlotMachine extends AvMicroservice {
  constructor({ http, promise, merge, config }) {
    const options = Object.assign(
      {
        name: 'platform/slotmachine/graphql',
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
    return this.create({ query: data });
  }
}
