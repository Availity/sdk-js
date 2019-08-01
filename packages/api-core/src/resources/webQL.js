import AvMicroservice from '../ms';

export default class AvWebQL extends AvMicroservice {
  constructor({ http, promise, merge, config }) {
    const options = Object.assign(
      {
        name: 'spc/web/graphql',
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
