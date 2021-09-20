import AvMicroserviceApi from '../ms';

export default class AvWebQLApi extends AvMicroserviceApi {
  constructor(config) {
    super({
      name: 'spc/web/graphql',
      ...config,
    });
  }
}

export const avWebQLApi = new AvWebQLApi();
