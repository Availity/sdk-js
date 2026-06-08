import AvApi from '../api';

export default class AvCodes extends AvApi {
  constructor(config) {
    const options = {
      name: 'codes',
      ...config,
    };

    super(options);
  }
}
