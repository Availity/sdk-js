import AvMicroservice from '../ms';

export default class AvThanos extends AvMicroservice {
  constructor({ http, promise, merge, config }) {
    const options = Object.assign(
      {
        name: 'spc/thanos/graphql',
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
