import AvMicroservice from '../ms';

export default class AvWebQL extends AvMicroservice {
  constructor(config) {
    const options = {
      name: 'spc/web/graphql',
      ...config,
    };
    super(options);
  }
}
