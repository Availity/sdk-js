import AvMicroservice from '../ms';

export default class AvSlotMachine extends AvMicroservice {
  constructor({ http, promise, merge, config }) {
    const options = {
      name: 'spc/slotmachine/graphql',
      ...config,
    };
    super({
      http,
      promise,
      merge,
      config: options,
    });
  }

  query(data, variables) {
    return this.create({ query: data, variables });
  }
}
