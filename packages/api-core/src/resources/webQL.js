import AvMicroservice from '../ms';

export default class AvWebQL extends AvMicroservice {
  constructor({ http, promise, merge, config }) {
    const options = {
      name: 'spc/web/graphql',
      ...config,
    };
    super({
      http,
      promise,
      merge,
      config: options,
    });
  }
}
